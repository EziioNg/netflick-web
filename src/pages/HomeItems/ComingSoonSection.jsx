import {useRef, useState, useEffect} from "react";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import mockWorthyShows from "~/constants/HomeMockDatas/mockWorthyShows.js";
import Modal2 from "~/pages/Modal2.jsx";

const ComingSoonSection = () => {
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

    // Modal2
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };
    }, [selectedItem]);

    return (
        <div className="worthy-section-container">
            <div className="worthy-text">
                <a className="worthy-title">
                    <span className="inline-flex h-full text-3xl font-bold flex-nowrap items-center flex-row gap-2">
                        ͡° ͜ʖ ͡°
                        <ArrowForwardIosIcon fontSize="small"/>
                    </span>
                </a>
            </div>
            <div className="relative w-full h-[376px] what-on-mask group/scroll">
                {/* Buttons scroll */}
                {showLeft && (
                    <div
                        className="absolute left-0 top-0 bottom-0 z-20 ml-2 mb-9 hidden group-hover/scroll:flex items-center justify-center bg-transparent px-2">
                        <button onClick={scrollLeft} className="px-2 py-[7px] ml-[1px] mb-[1px] bg-black text-white inline-block rounded-full cursor-pointer hover:bg-white hover:text-black">
                            <ArrowBackIosIcon className="translate-x-[3.5px]" fontSize="small"/>
                        </button>
                    </div>
                )}
                {showRight && (
                    <div
                        className="absolute right-0 top-0 bottom-0 z-20 mr-5 mb-9 hidden group-hover/scroll:flex items-center justify-center bg-transparent px-2">
                        <button onClick={scrollRight} className="px-2 py-[7px] ml-[1px] mb-[1px] bg-black text-white inline-block rounded-full cursor-pointer hover:bg-white hover:text-black">
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
                            onClick={() => setSelectedItem(item)}
                            className={`worthy-items-section-container worthy-width group shrink-0 snap-start mb-1
                                    ${idx === 0 ? 'ml-16' : ''} ${idx === mockWorthyShows.length - 1 ? 'mr-16' : ''}`}
                        >
                            <div className="worthy-items-section flex-1 worthy-width worthy-height rounded-lg group-hover:shadow-[0_0_0_2px_white]">
                                <div className="worthy-items-bg max-h-full">
                                    <img
                                        className="worthy-items-bg-image transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]"
                                        src={item.imageUrl}
                                        alt={item.title}
                                    />
                                </div>
                            </div>
                        </figure>
                    ))}
                    {/* Modal2 */}
                    {selectedItem && (
                        <Modal2 onClose={() => setSelectedItem(null)}>
                            <div>
                                {/* Hình ảnh */}
                                <div className="max-w-[1279px] max-h-[718px]">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src={selectedItem.imageUrl}
                                        alt="image"
                                    />
                                </div>
                                {/* Mô tả bên dưới hình */}
                                <span className="block mt-4 justify-self-center italic text-base font-bold text-text-default text-ellipsis overflow-hidden line-clamp-4">
                                        {selectedItem.title}
                                </span>
                            </div>
                        </Modal2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComingSoonSection;