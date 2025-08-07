import {useEffect, useRef, useState} from "react";

import {useNavigate} from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const Categories = ({categories, loading}) => {
    // console.log(categories)

    // Scroll
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        checkScroll(); // Check ban đầu

        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll); // Responsive check

        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const scrollLeft = () => {
        const el = scrollRef.current;
        el.scrollBy({left: -el.clientWidth, behavior: "smooth"});
    };

    const scrollRight = () => {
        const el = scrollRef.current;
        el.scrollBy({left: el.clientWidth, behavior: "smooth"});
    };

    useEffect(() => {
        // Delay để chờ React render DOM → đảm bảo scrollWidth đã cập nhật
        const timeout = setTimeout(() => {
            checkScroll();
        }, 100); // 50~100ms là đủ

        return () => clearTimeout(timeout);
    }, [categories]);

    // Navigate
    const navigate = useNavigate();

    return (
        <div className="what-on-section-container">
            <div className="what-on-text">
                <a className="what-on-title">
                    <span className="inline-flex h-full flex-nowrap items-center flex-row gap-2">
                        Categories
                    </span>
                </a>
            </div>

            <div className="relative w-full h-[199.2px] what-on-mask group/scroll">
                {/* Buttons scroll */}
                {showLeft && (
                    <div
                        className="absolute left-0 top-0 bottom-0 z-20 ml-2 mb-9 hidden group-hover/scroll:flex items-center justify-center bg-transparent px-2">
                        <button onClick={scrollLeft}
                                className="px-2 py-[7px] ml-[1px] mb-[1px] bg-black text-white inline-block rounded-full cursor-pointer hover:bg-white hover:text-black">
                            <ArrowBackIosIcon className="translate-x-[3.5px]" fontSize="small"/>
                        </button>
                    </div>
                )}
                {showRight && (
                    <div
                        className="absolute right-0 top-0 bottom-0 z-20 mr-5 mb-9 hidden group-hover/scroll:flex items-center justify-center bg-transparent px-2">
                        <button onClick={scrollRight}
                                className="px-2 py-[7px] ml-[1px] mb-[1px] bg-black text-white inline-block rounded-full cursor-pointer hover:bg-white hover:text-black">
                            <ArrowForwardIosIcon fontSize="small"/>
                        </button>
                    </div>
                )}
                 {/*Scrollable content */}
                <div ref={scrollRef}
                     className="flex flex-row grow-0 shrink-0 px-16 gap-4 overflow-x-scroll scroll-smooth no-scrollbar scroll-snap-x snap-mandatory list-none">
                    {categories.map((item, idx) => (
                        <figure
                            // key={item.id}
                            key={item?._id || idx}
                            onClick={() => navigate(`/category/${item._id}`)}
                            className="flex my-0.5 shrink-0"
                        >
                            <div
                                className="inline-flex m-auto p-4 overflow-hidden rounded-lg cursor-pointer w-[288px] h-[172px] bg-background-card hover:shadow-[0_0_0_2px_white]">
                                <div className="flex flex-col grow shrink flex-nowrap justify-center items-center">
                                    <span className="text-3xl font-extrabold">{item.name}</span>
                                </div>
                            </div>
                        </figure>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;