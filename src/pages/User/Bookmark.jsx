import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "~/redux/user/userSlice.js";
import { getFavoritesAPI } from "~/apis/index.js";

const Bookmark = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const currentUser = useSelector(selectCurrentUser);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser?._id) {
        setMovies([]);
        return;
      }
      setLoading(true);
      try {
        const data = await getFavoritesAPI(currentUser._id);
        setMovies(data); // data là list movie trả về từ API
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [currentUser]);

  useEffect(() => {
    const apiTest = async () => {
      await getFavoritesAPI(currentUser._id);
    };
    apiTest();
  }, []);
  useEffect(() => {
    const apiTest = async () => {
      await getFavoritesAPI(currentUser._id);
    };
    apiTest();
  }, []);
  useEffect(() => {
    const apiTest = async () => {
      await getFavoritesAPI(currentUser._id);
    };
    apiTest();
  }, []);
  useEffect(() => {
    const apiTest = async () => {
      await getFavoritesAPI(currentUser._id);
    };
    apiTest();
  }, []);

  // Navigate
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <div className="bm-header">
        <div className="header-title">Bookmarks</div>
        <div className="header-tabs">
          <button
            onClick={() => setActiveTab("movies")}
            className={`tab-item rounded-search transition 
                            ${
                              activeTab === "movies"
                                ? "bg-white text-black opacity-100"
                                : "bg-background-user-bookmark text-white hover:opacity-100"
                            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab("series")}
            className={`tab-item rounded-search ml-2.5 transition 
                            ${
                              activeTab === "series"
                                ? "bg-white text-black opacity-100"
                                : "bg-background-user-bookmark text-white hover:opacity-100"
                            }`}
          >
            Series
          </button>
        </div>
      </div>

      {/*Movies*/}
      <div className="bm-body">
        <div
          className={`inset-0 transition-opacity duration-150 ease-linear ${
            activeTab === "movies"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {loading ? (
            <div className="body-none-text">Loading...</div>
          ) : movies.length > 0 ? (
            <div>
              <div className="grid grid-cols-5 gap-8">
                {movies.map((item, idx) => (
                  <figure
                    key={idx}
                    onClick={() => navigate(`/movies/${item._id}`)}
                    className="flex flex-col flex-nowrap gap-2 max-w-[223px] max-h-[376px] group cursor-pointer"
                  >
                    <div className="overflow-hidden rounded-lg cursor-pointer group-hover:shadow-[0_0_0_2px_white]">
                      <div className="max-h-[332px] overflow-hidden rounded">
                        <img
                          className="w-full h-[332px] object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]"
                          src={item.movieImage}
                          alt={item.title}
                        />
                      </div>
                    </div>
                    <figcaption className="flex flex-col grow-0 shrink pointer-events-none">
                      <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap w-[221.33px] text-white text-sm font-normal">
                        {item.title}
                      </span>
                      <span className="inline-flex overflow-hidden overflow-ellipsis whitespace-nowrap text-text-muted text-xs font-semibold min-h-4">
                        {item.review}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={`absolute inset-0 transition-opacity duration-150 ease-linear ${
                activeTab === "movies"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="body-none-text">Your Movie Bookmarks</div>
            </div>
          )}
        </div>

        {/*Series*/}
        <div
          className={`absolute inset-0 transition-opacity duration-150 ease-linear ${
            activeTab === "series"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="body-none-text">Your Series Bookmarks</div>
        </div>
      </div>
    </div>
  );
};
export default Bookmark;
