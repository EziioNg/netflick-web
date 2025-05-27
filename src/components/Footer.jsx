import { useRef, useState } from "react";

import {
    useFloating,
    offset,
    flip,
    size,
    autoUpdate,
    useDismiss,
    useRole,
    useClick,
    useInteractions,
    useListNavigation,
    useTypeahead,
    FloatingPortal,
    FloatingFocusManager,
} from "@floating-ui/react";

import { Instagram, X, Facebook, LinkedIn, Google, YouTube, Reddit, ArrowDropDown } from '@mui/icons-material';

const options = [
    "🇺🇸 US",
    "🇬🇧 GB",
    "🇫🇷 FR",
    "🇩🇪 DE",
    "🇮🇹 IT",
    "🇵🇹 PT",
    "🇪🇸 ES"
];

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const { refs, floatingStyles, context } = useFloating({
        placement: "bottom-start",
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({ padding: 10 }),
            size({
                apply({ rects, elements, availableHeight }) {
                    Object.assign(elements.floating.style, {
                        maxHeight: `${availableHeight}px`,
                        minWidth: `${rects.reference.width}px`,
                    });
                },
                padding: 10,
            }),
        ],
    });

    const listRef = useRef([]);
    const listContentRef = useRef(options);
    const isTypingRef = useRef(false);

    const click = useClick(context, { event: "mousedown" });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "listbox" });
    const listNav = useListNavigation(context, {
        listRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        loop: true,
    });
    const typeahead = useTypeahead(context, {
        listRef: listContentRef,
        activeIndex,
        selectedIndex,
        onMatch: isOpen ? setActiveIndex : setSelectedIndex,
        onTypingChange(isTyping) {
            isTypingRef.current = isTyping;
        },
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        dismiss,
        role,
        listNav,
        typeahead,
        click,
    ]);

    const handleSelect = (index) => {
        setSelectedIndex(index);
        setIsOpen(false);
    };

    const selectedItemLabel = selectedIndex !== null ? options[selectedIndex] : undefined;

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
    }

    const mergedReferenceProps = getReferenceProps({
        onClick: handleClick,
    });

    return (
        <footer className="footer-section">
            <div className="w-full max-w-[960px] mx-auto pb-20">
                <div className="flex flex-col gap-16">
                    <div className="flex flex-row grow-0 shrink justify-between items-start">
                        <div className="flex flex-col w-[105px] h-[100px] items-end gap-4">
                            <img src="/assets/images/89y6neiw2h121.png" alt="HomeIcon" className="footer-icon" />
                            <div>
                                <div
                                    tabIndex={0}
                                    ref={refs.setReference}
                                    aria-labelledby="select-label"
                                    aria-autocomplete="none"
                                    onClick={handleClick}
                                    className={`${
                                        isSelected ? 'footer-dropdown-active' : 'footer-dropdown'
                                    }`}
                                    {...mergedReferenceProps}
                                    /*{...getReferenceProps()}*/
                                >
                                    {selectedItemLabel || "🇺🇸 US"}
                                    <ArrowDropDown/>
                                </div>
                                {isOpen && (
                                    <FloatingPortal>
                                        <FloatingFocusManager context={context} modal={false}>
                                            <div
                                                ref={refs.setFloating}
                                                style={{
                                                    ...floatingStyles,
                                                    overflowY: "auto",
                                                    color: "#0e0e10",
                                                    background: "#fff",
                                                    minWidth: 100,
                                                    borderRadius: 8,
                                                    outline: 0,
                                                }}
                                                {...getFloatingProps()}
                                            >
                                                {options.map((value, i) => (
                                                    <div
                                                        key={value}
                                                        ref={(node) => {
                                                            listRef.current[i] = node;
                                                        }}
                                                        role="option"
                                                        tabIndex={i === activeIndex ? 0 : -1}
                                                        aria-selected={i === selectedIndex && i === activeIndex}
                                                        style={{
                                                            padding: 10,
                                                            cursor: "default",
                                                            background: i === activeIndex ? "#15a9fc" : "",
                                                            position: "relative",
                                                        }}
                                                        {...getItemProps({
                                                            onClick() {
                                                                handleSelect(i);
                                                            },
                                                            onKeyDown(event) {
                                                                if (event.key === "Enter") {
                                                                    event.preventDefault();
                                                                    handleSelect(i);
                                                                }

                                                                if (event.key === " " && !isTypingRef.current) {
                                                                    event.preventDefault();
                                                                    handleSelect(i);
                                                                }
                                                            },
                                                        })}
                                                    >
                                                        {value}
                                                        <span
                                                            aria-hidden
                                                            style={{
                                                                position: "absolute",
                                                                right: 10,
                                                            }}
                                                        >
                                                            {i === selectedIndex ? " ✓" : ""}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </FloatingFocusManager>
                                    </FloatingPortal>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-row grow-0 shrink gap-12">
                            <div className="flex flex-col grow-0 shrink items-start gap-2">
                                <h3 className="text-base font-bold">Company</h3>
                                <ul className="flex flex-col grow-0 shrink gap-2 items-start list-none">
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">About</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Careers</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Our Culture</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Giving</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Press Room</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Partners</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Plex Gear</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">The Plex Blog</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Advertise with Us</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col grow-0 shrink items-start gap-2">
                                <h3 className="text-base font-bold">Go Premium</h3>
                                <ul className="flex flex-col grow-0 shrink gap-2 items-start list-none">
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Plans</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Plex Labs</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Get Perks</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col grow-0 shrink items-start gap-2">
                                <h3 className="text-base font-bold">Downloads</h3>
                                <ul className="flex flex-col grow-0 shrink gap-2 items-start list-none">
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Plex Media Server</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Plex</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Plexamp</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Plex Photos</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Plex Dash</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Where to Watch</span>
                                        </a>
                                    </li>
                                </ul>
                            </div >

                            <div className="flex flex-col grow-0 shrink items-start gap-2">
                                <h3 className="text-base font-bold">Support</h3>
                                <ul className="flex flex-col grow-0 shrink gap-2 items-start list-none">
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Finding Help</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Support Library</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Community Forums</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Community Guidelines</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Billing Questions</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Status</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Bug Bounty</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">CordCutter</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Get in Touch</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col grow-0 shrink items-start gap-2">
                                <h3 className="text-base font-bold">Watch Free</h3>
                                <ul className="flex flex-col grow-0 shrink gap-2 items-start list-none text-xs">
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Discover on Plex</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">TV Channel Finder</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">What to Watch</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">What to Watch on Netflix</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">What to Watch on Hulu</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">A24 collection</span>
                                        </a>
                                    </li>
                                    <li className="flex flex-col grow-0 shrink">
                                        <a href="" className="text-text-mute text-xs">
                                            <span className="footer-text">Movies Database</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between items-center gap-2 max-h-10">
                        <div className="flex flex-col grow-0 shrink gap-6">
                            <div className="flex flex-row grow-0 shrink justify-start gap-6">
                                <div>
                                    <span className="text-text-mute text-xs">
                                        Copyright ©
                                        2025
                                         Plex
                                    </span>
                                </div>
                                <a href="" className="text-text-mute grow-0 shrink">
                                    <span className="footer-text">Privacy & Legal</span>
                                </a>
                                <a href="" className="text-text-mute grow-0 shrink">
                                    <span className="footer-text">Ad Choices</span>
                                </a>
                                <a href="" className="text-text-mute grow-0 shrink">
                                    <span className="footer-text">Accessibility</span>
                                </a>
                                <a href="" className="text-text-mute grow-0 shrink">
                                    <span className="footer-btn">Manage Cookies</span>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-row grow-0 shrink items-center max-h-10">
                            <a href="" className="p-3 min-h-10 footer-logos rounded-search">
                                <Instagram/>
                            </a>
                            <a href="" className="p-3 min-h-10 footer-logos rounded-search">
                                <X/>
                            </a>
                            <a href="" className="p-3 min-h-10 footer-logos rounded-search">
                                <Facebook/>
                            </a>
                            <a href="" className="p-3 min-h-10 footer-logos rounded-search">
                                <LinkedIn/>
                            </a>
                            <a href="" className="p-3 min-h-10 footer-logos rounded-search">
                                <Google/>
                            </a>
                            <a href="" className="p-3 min-h-10 footer-logos rounded-search">
                                <YouTube/>
                            </a>
                            <a href="" className="p-3 min-h-10 footer-logos rounded-search">
                                <Reddit/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
