import {useRef, useState, useEffect} from "react";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { fetchMoviesAPI } from "~/apis/index.js"
import {useNavigate} from "react-router-dom";

const WhatOnSection = () => {
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
        el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
    };

    const scrollRight = () => {
        const el = scrollRef.current;
        el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    };

    // API
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMoviesAPI()
            .then(data => {
                console.log('Dữ liệu từ API:', data);
                // setMovies(data);
                setMovies(data.movies);
            })
            .catch(err => console.error('Lỗi khi fetch movies:', err));
    }, []);

    useEffect(() => {
        // Delay để chờ React render DOM → đảm bảo scrollWidth đã cập nhật
        const timeout = setTimeout(() => {
            checkScroll();
        }, 100); // 50~100ms là đủ

        return () => clearTimeout(timeout);
    }, [movies]);

    // Navigate
    const navigate = useNavigate();

    return (
        <div className="what-on-section-container">
            <div className="what-on-text">
                <a className="what-on-title">
                    <span className="inline-flex h-full flex-nowrap items-center flex-row gap-2">
                        What's On Now
                        <ArrowForwardIosIcon fontSize="small"/>
                    </span>
                </a>
                <span className="what-on-desc">Live TV</span>
            </div>
            <div className="relative w-full h-[199.2px] what-on-mask group/scroll">
                {/* Buttons scroll */}
                {showLeft && (
                    <div
                        className="absolute left-0 top-0 bottom-0 z-20 ml-2 mb-9 hidden group-hover/scroll:flex items-center justify-center bg-transparent px-2">
                        <button onClick={scrollLeft} className="p-2 inline-block rounded-full bg-static-grey-5 cursor-pointer">
                            <ArrowBackIosIcon className="translate-x-[3.5px]" fontSize="small"/>
                        </button>
                    </div>
                )}
                {showRight && (
                    <div
                        className="absolute right-0 top-0 bottom-0 z-20 mr-5 mb-9 hidden group-hover/scroll:flex items-center justify-center bg-transparent px-2">
                        <button onClick={scrollRight} className="p-2 inline-block rounded-full bg-static-grey-5 cursor-pointer">
                            <ArrowForwardIosIcon fontSize="small"/>
                        </button>
                    </div>
                )}

                {/* Scrollable content */}
                <div
                    ref={scrollRef}
                    className="flex h-full gap-4 overflow-x-scroll scroll-smooth no-scrollbar scroll-snap-x snap-mandatory"
                >
                    {movies.map((item, idx) => (
                        <figure
                            // key={item._id}
                            key={item?._id || idx}
                            onClick={() => navigate(`/movies/${item._id}`)}
                            className={`what-on-items-section-container what-on-width group shrink-0 snap-start
                                ${idx === 0 ? 'ml-16' : ''} ${idx === movies.length - 1 ? 'mr-16' : ''}`}
                        >
                            <div
                                className="what-on-items-section what-on-width what-on-height rounded-lg group-hover:shadow-[0_0_0_2px_white]">
                                <div className="what-on-items-bg">
                                    <img
                                        className="what-on-items-bg-image transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]"
                                        src={item.movieImage}
                                        alt={item.title}
                                    />
                                </div>
                            </div>
                            <figcaption className="flex flex-col grow-0 shrink pointer-events-none">
                                <span className="inline-flex overflow-ellipsis whitespace-nowrap text-white text-sm font-normal">
                                  {item.title}
                                </span>
                                <span className="inline-flex overflow-ellipsis whitespace-nowrap text-text-muted text-xs font-semibold min-h-4">
                                  {item.description}
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatOnSection;