import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import TvIcon from "@mui/icons-material/Tv";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ExploreIcon from "@mui/icons-material/Explore";

const navLinks = [
  {
    name: "Home",
    link: "/home",
    icon: HomeIcon,
  },
  {
    name: "Like TV",
    link: "#likeTV",
    icon: TvIcon,
    content: (
      <div className="flex w-[668px] flex-row justify-normal text-black-100">
        <div className="block w-[232px] px-4 py-3 bg-nav-menu1-background">
          <div className="flex flex-col h-[220px] px-4">
            <div className="flex-[2] flex flex-col">
              <div className="pt-3">
                <h3 className="text-[16px] font-bold text-text-color-muted">
                  Explore
                </h3>
              </div>
              <Link to="#" className="pt-3 text-[14px] font-normal">
                Browse Channels
              </Link>
            </div>
            <div className="flex-[3] flex flex-col gap-[0.5rem]">
              <h3 className="text-[16px] font-bold text-text-color-muted">
                Featured Channels
              </h3>
              <div>
                <Link to="#" className="py-1 text-[14px] font-normal">
                  Nosey
                </Link>
              </div>
              <div>
                <Link to="#" className="py-1 text-[14px] font-normal">
                  FailArmy
                </Link>
              </div>
              <div>
                <Link to="#" className="py-1 text-[14px] font-normal">
                  Always Funny
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="block min-w-[436px] px-4 py-3">
          <div className="flex flex-col gap-[0.5rem]">
            <div className="pt-3">
              <h3 className="text-[16px] font-bold text-text-color-muted">
                Categories
              </h3>
            </div>
            <ul
              className="
                            grid
                            relative
                            [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]
                            auto-rows-auto
                            text-[14px]
                            font-normal
                            gap-1"
            >
              <li className="max-w-[200px]">
                <Link to="/category/6874ca16346bbf62467bee98" className="py-1">
                  Action
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link to="/category/6874c84d346bbf62467bee89" className="py-1">
                  Adventure
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link to="/category/6874c98d346bbf62467bee97" className="py-1">
                  Fantasy
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link to="/category/6874c95c346bbf62467bee95" className="py-1">
                  Xenos
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link to="/category/6874c96d346bbf62467bee96" className="py-1">
                  Sci-fi
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Mystery
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Historical
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Apocalypse
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Martial arts
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Drama
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Comedy
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Romance
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Western
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Sports
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "On Demand",
    link: "#ondemand",
    icon: LiveTvIcon,
    content: (
      <div className="flex w-[668px] flex-row justify-normal text-black-100">
        <div className="block w-[232px] px-4 py-3 bg-nav-menu1-background">
          <div className="flex flex-col h-[220px] px-4">
            <div className="flex-[2] flex flex-col gap-2">
              <div className="pt-3">
                <h3 className="text-[16px] font-bold text-text-color-muted">
                  Explore
                </h3>
              </div>
              <div className="flex-[3] flex flex-col gap-[0.25rem]">
                <div>
                  <Link to="#" className="py-1 text-[14px] font-normal">
                    Movies & TV Shows
                  </Link>
                </div>
                <div>
                  <Link to="#" className="py-1 text-[14px] font-normal">
                    Most Popular
                  </Link>
                </div>
                <div>
                  <Link to="#" className="py-1 text-[14px] font-normal">
                    Leaving Soon
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block min-w-[436px] px-4 py-3">
          <div className="flex flex-col gap-[0.5rem]">
            <div className="pt-3">
              <h3 className="text-[16px] font-bold text-text-color-muted">
                Categories
              </h3>
            </div>
            <ul
              className="
                            grid
                            relative
                            [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]
                            auto-rows-auto
                            text-[14px]
                            font-normal
                            gap-1"
            >
              <li className="max-w-[200px]">
                <Link to="/category/6874ca16346bbf62467bee98" className="py-1">
                  Action
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link to="/category/6874c84d346bbf62467bee89" className="py-1">
                  Adventure
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link to="/category/6874c98d346bbf62467bee97" className="py-1">
                  Fantasy
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link to="/category/6874c95c346bbf62467bee95" className="py-1">
                  Xenos
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link to="/category/6874c96d346bbf62467bee96" className="py-1">
                  Sci-fi
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Mystery
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Historical
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Apocalypse
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Martial arts
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Drama
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Comedy
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Romance
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Western
                </Link>
              </li>
              <li className="max-w-[200px]">
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="py-1"
                >
                  Sports
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Discover",
    link: "/category/686b74eb2b65be5c804297f2",
    icon: ExploreIcon,
  },
];

export { navLinks };
