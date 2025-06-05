import {useRef, useState, useEffect} from "react";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import mockWorthyShows from "~/constants/HomeMockDatas/mockWorthyShows.js";

const TilDeathSection = () => {
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

    return (
        <div className="worthy-section-container">
            <div className="worthy-text">
                <a className="worthy-title">
                    <span className="inline-flex h-full flex-nowrap items-center flex-row gap-2">
                        Til Death Do Us Part
                        <ArrowForwardIosIcon fontSize="small"/>
                    </span>
                </a>
                <span className="worthy-desc">On Demand</span>
            </div>
            <div className="relative w-full h-[376px] what-on-mask group/scroll">
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
                    {mockWorthyShows.map((item, idx) => (
                        <figure
                            key={item.id}
                            className={`worthy-items-section-container worthy-width group shrink-0 snap-start
                                    ${idx === 0 ? 'ml-16' : ''} ${idx === mockWorthyShows.length - 1 ? 'mr-16' : ''}`}
                        >
                            <div className="worthy-items-section flex-1 worthy-width worthy-height rounded-lg group-hover:shadow-[0_0_0_2px_white]">
                                <div className="worthy-items-bg max-h-[332px]">
                                    <img
                                        className="worthy-items-bg-image transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]"
                                        src={item.imageUrl}
                                        alt={item.title}
                                    />
                                </div>
                            </div>
                            <figcaption className="flex flex-col grow-0 shrink pointer-events-none">
                                  <span className="inline-flex overflow-ellipsis whitespace-nowrap text-white text-sm font-normal">
                                    {item.title}
                                  </span>
                                <span className="inline-flex overflow-ellipsis whitespace-nowrap text-text-muted text-xs font-semibold min-h-4">
                                    {item.timeLeft}
                                  </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TilDeathSection;