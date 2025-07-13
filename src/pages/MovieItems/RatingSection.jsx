import {useEffect, useRef, useState} from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import mockRatings from "~/constants/MovieMockDatas/mockRatings.js";
import Modal from "../Modal.jsx";

const RatingSection = ({movie}) => {
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

    // Modal
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden"; // 👈 thêm dòng này
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto"; // 👈 thêm dòng này
        }

        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };
    }, [selectedItem]);


    return (
        <div className="what-on-section-container">
            <div className="what-on-text">
                <a className="what-on-title">
                    <span className="inline-flex h-full flex-nowrap items-center flex-row gap-2">
                        {movie?.title} Ratings & Reviews
                    </span>
                </a>
            </div>

            <div className="relative w-full h-[199.2px] what-on-mask group/scroll">
                {/* Buttons scroll */}
                {showLeft && (
                    <div
                        className="absolute left-0 top-0 bottom-0 z-20 ml-2 mb-9 hidden group-hover/scroll:flex items-center justify-center bg-transparent px-2">
                        <button onClick={scrollLeft}
                                className="p-2 inline-block rounded-full bg-static-grey-5 cursor-pointer">
                            <ArrowBackIosIcon className="translate-x-[3.5px]" fontSize="small"/>
                        </button>
                    </div>
                )}
                {showRight && (
                    <div
                        className="absolute right-0 top-0 bottom-0 z-20 mr-5 mb-9 hidden group-hover/scroll:flex items-center justify-center bg-transparent px-2">
                        <button onClick={scrollRight}
                                className="p-2 inline-block rounded-full bg-static-grey-5 cursor-pointer">
                            <ArrowForwardIosIcon fontSize="small"/>
                        </button>
                    </div>
                )}

                {/* Scrollable content */}
                <div ref={scrollRef}
                     className="flex flex-row grow-0 shrink-0 px-16 gap-4 overflow-x-scroll scroll-smooth no-scrollbar scroll-snap-x snap-mandatory list-none">
                    {mockRatings.map((item, idx) => (
                        <figure
                            key={item.id}
                            className="flex my-0.5 shrink-0"
                            onClick={() => setSelectedItem(item)}
                        >
                            <div
                                className="inline-flex m-auto p-4 overflow-hidden rounded-lg cursor-pointer w-[288px] h-[172px] bg-background-card hover:shadow-[0_0_0_2px_white]">
                                <div className="flex flex-col grow shrink flex-nowrap items-start gap-3">
                                    <div className="flex flex-row grow-0 shrink flex-nowrap items-center gap-4">
                                        <img className="max-w-12"
                                             src={item.symbol}
                                             alt="symbol"/>
                                        <div className="flex flex-col grow-0 shrink flex-nowrap">
                                            <span className="text-sm font-normal">{item.name}</span>
                                            <span className="text-xs italic font-normal text-text-mute">{item.quote}</span>
                                        </div>
                                    </div>
                                    <span
                                        className="max-w-full h-[80px] text-ellipsis overflow-hidden line-clamp-4 text-sm font-normal">
                                    {item.battleCry}
                                </span>
                                </div>
                            </div>
                        </figure>
                    ))}
                </div>
                {/* Modal */}
                {selectedItem && (
                    <Modal onClose={() => setSelectedItem(null)}>
                        <div className="flex flex-col grow shrink flex-nowrap items-start gap-6">
                            <div className="flex flex-row grow-0 shrink flex-nowrap items-center gap-4">
                                <img className="max-w-12"
                                     src={selectedItem.symbol}
                                     alt="symbol"/>
                                <div className="flex flex-col grow-0 shrink flex-nowrap">
                                    <span className="text-base font-bold text-text-default">{selectedItem.name}</span>
                                    <span className="text-xs italic font-normal text-text-mute">{selectedItem.quote}</span>
                                </div>
                            </div>
                            <span
                                className="max-w-full h-[80px] text-ellipsis overflow-hidden line-clamp-4 text-sm font-normal text-text-default">
                                    {selectedItem.battleCry}
                                </span>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default RatingSection;