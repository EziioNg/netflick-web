// useNavigationLinks.js
import { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import TvIcon from "@mui/icons-material/Tv";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ExploreIcon from "@mui/icons-material/Explore";

import { getCategories } from "~/apis";

export const NavigationMenu = () => {
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      const links = [
        {
          name: "Home",
          link: "#home",
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
                      <h3 className="text-[16px] font-bold text-text-muted">
                        Explore
                      </h3>
                    </div>
                    <a href="" className="pt-3 text-[14px] font-normal">
                      Browse Channels
                    </a>
                  </div>
                  <div className="flex-[3] flex flex-col gap-[0.5rem]">
                    <h3 className="text-[16px] font-bold text-text-muted">
                      Featured Channels
                    </h3>
                    {categories.slice(0, 3).map((cat, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="py-1 text-[14px] font-normal"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="block min-w-[436px] px-4 py-3">
                <div className="flex flex-col gap-[0.5rem]">
                  <div className="pt-3">
                    <h3 className="text-[16px] font-bold text-text-muted">
                      Categories
                    </h3>
                  </div>
                  <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] auto-rows-auto text-[14px] font-normal gap-1">
                    {/*{categories.map((cat, idx) => (*/}
                    {/*    <li key={idx} className="max-w-[200px]">*/}
                    {/*        <a href="#" className="py-1">{cat.name}</a>*/}
                    {/*    </li>*/}
                    {/*))}*/}
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
                    </li>
                    <li className="max-w-[200px]">
                      <a href="" className="py-1">
                        Name Default
                      </a>
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
          // Có thể xử lý tương tự content như Like TV
        },
        {
          name: "Discover",
          link: "#discover",
          icon: ExploreIcon,
        },
      ];
      setNavLinks(links);
    });
  }, []);
  return navLinks;
};
