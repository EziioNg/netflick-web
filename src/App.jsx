import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";

import ScrollToTop from "~/components/ScrollToTop.jsx";

import MainLayout from "./layouts/MainLayout";
import MovieLayout from "./layouts/MovieLayout";
import WatchLayout from "./layouts/WatchLayout.jsx";
import MotionLayout from "./layouts/MotionLayout";

import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Watch from "./pages/Watch";
import Category from "./pages/Category";
import NotFound from "~/pages/404/NotFound.jsx";
import Auth from "~/pages/Auth/Auth.jsx";
import User from "~/pages/User/User.jsx";

import { selectCurrentUser } from "~/redux/user/userSlice.js";
import AccountVerification from "~/pages/Auth/AccountVerification.jsx";

const ProtectedRoute = ({ user }) => {
  // console.log('user: ', user)
  if (!user) return <Navigate to="/login" replace={true} />; // nếu user không tồn tại(chưa login) thì đá về trang login
  return <Outlet />; // đến route children
};

function App() {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser); // lấy thông tin user từ kho dữ liệu redux

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        {/* Redirect Routes */}
        <Route path="/" element={<Navigate to="/home" replace={true} />} />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            <MotionLayout>
              <MainLayout>
                <Home />
              </MainLayout>
            </MotionLayout>
          }
        />

        {/* Category Page */}
        <Route
          path="/category/:categoryId"
          element={
            <MotionLayout>
              <MainLayout>
                <Category />
              </MainLayout>
            </MotionLayout>
          }
        />

        {/* Movie Details */}
        <Route
          path="/movies/:movieId"
          element={
            <MotionLayout>
              <MovieLayout>
                <Movie />
              </MovieLayout>
            </MotionLayout>
          }
        />

        {/* Watch Page */}
        <Route
          path="/movies/watch/:movieId"
          element={
            <MotionLayout>
              <WatchLayout>
                <Watch />
              </WatchLayout>
            </MotionLayout>
          }
        />

        {/* Login - Reister */}
        <Route
          path="/login"
          element={
            <MotionLayout>
              <Auth />
            </MotionLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MotionLayout>
              <Auth />
            </MotionLayout>
          }
        />
        <Route
          path="/account/verification"
          element={
            <MotionLayout>
              <AccountVerification />
            </MotionLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <MotionLayout>
              <Auth />
            </MotionLayout>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <MotionLayout>
              <Auth />
            </MotionLayout>
          }
        />

        {/* User Page */}
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route
            path="/user/:tab?"
            element={
              <MotionLayout>
                <MainLayout>
                  <User />
                </MainLayout>
              </MotionLayout>
            }
          />
        </Route>

        {/* 404 page */}
        <Route
          path="*"
          element={
            <MotionLayout>
              <NotFound />
            </MotionLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
