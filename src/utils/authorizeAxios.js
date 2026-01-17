import axios from "axios";

import { toast } from "react-toastify";

import { interceptorLoadingElements } from "./formatters";
import { refreshTokenApi } from "~/apis";
import { logoutUserAPI } from "~/redux/user/userSlice";

// Không thể import store từ redux/store vì đây không phải file component(.jsx)
// Dùng injectStore thay thế
let axiosReduxStore;
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};

// khởi tạo 1 đối tượng axios để custom và cấu hình chung cho dự án
let authorizedAxiosInstance = axios.create();
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10; // thời gian tối đa cho 1 request (10 phút)
authorizedAxiosInstance.defaults.withCredentials = true; // cho phép axios tự động gửi cookie trong mỗi request

// Cấu hình Interceptors:
// Interceptor Request: can thiệp vào giữa các request api gửi đi
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // chặn spam click:
    interceptorLoadingElements(true);

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Khởi tạo 1 promise để gọi api refresh_token
let refreshTokenPromise = null;

// Interceptor Response: can thiệp vào giữa các response nhận về
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // chặn spam click:
    interceptorLoadingElements(false);

    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // chặn spam click:
    interceptorLoadingElements(false);

    // Xử lý refresh token tự động
    if (error.response?.status === 401) {
      // Nếu nhận mã 401 từ BE
      axiosReduxStore.dispatch(logoutUserAPI(false)); // dùng dispatch gọi logoutUserAPI từ redux
    }

    // Lấy các api đang bị lỗi thông qua error.config
    const originalRequests = error.config;
    // console.log('originalRequests1: ', originalRequests)

    if (error.response?.status === 410 && !originalRequests._retry) {
      // Nếu nhận mã 410 từ BE
      // Gán thêm 1 giá trị retry = true đảm bảo refresh token chỉ gọi 1 lần tại 1 thời điểm
      originalRequests._retry = true;
      // console.log('đang refresh token...')

      if (!refreshTokenPromise) {
        // Nếu chưa có refreshTokenPromise
        refreshTokenPromise = refreshTokenApi() // Gọi api refresh token và gán cho refreshTokenPromise
          // BE sẽ lấy refresh token từ cookies
          .then((data) => {
            // accessToken đã nằm trong httpOnly cookie (xử lý từ BE)
            return data?.accessToken;
          })
          .catch((_error) => {
            // có lỗi trong lúc refresh token thì logout
            axiosReduxStore.dispatch(logoutUserAPI(false));
            return Promise.reject(_error); // tránh gặp lỗi gọi api logout 2 lần
          })
          .finally(() => {
            // Gán lại refreshTokenPromise về null
            refreshTokenPromise = null;
          });
      }
      // return trường hợp refreshTokenPromise chạy thành công và xử lý thêm
      return refreshTokenPromise.then(() => {
        // Lưu acctessToken vào đâu đó nếu cần
        //...

        // return lại axiosInstance để gọi lại các originalRequests ban đầu bị lỗi
        // console.log('refresh token thành công!')
        return authorizedAxiosInstance(originalRequests);
      });
    }

    // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi api ở đây:
    // console.log('error axios: ', error)
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    // Dùng toastify để hiển thị mọi mã lỗi ra màn hình (ngoại trừ 410)
    if (error.response?.status !== 410) {
      toast.error(errorMessage);
    }
  },
);

export default authorizedAxiosInstance;
