let apiRoot = "";

// console.log(import.meta.env)
// console.log(process.env)

// môi trường dev
if (process.env.BUILD_MODE === "dev") {
  // process.env.BUILD_MODE === 'dev' / import.meta.env.DEV
  apiRoot = "http://localhost:8017"; // backend local
}
// môi trường production
if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://netflick-api.onrender.com"; // endpoint api đã deploy bằng Render
}

export const API_ROOT = apiRoot;

export const DEFAULT_MOVIE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 12;
