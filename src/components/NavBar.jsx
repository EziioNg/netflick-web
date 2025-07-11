import {
    useState,
    // useEffect,
    useRef
} from "react"

import SearchIcon from '@mui/icons-material/Search';
import CastIcon from '@mui/icons-material/Cast';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import {
    safePolygon,
    useFloating,
    useHover,
    useInteractions,
    FloatingArrow,
    arrow,
    offset,
    flip,
    shift, autoUpdate, useTransitionStyles,
} from '@floating-ui/react';

import { navLinks } from "~/constants/NavLinks/index.jsx"
import {NavigationMenu} from "~/constants/NavLinks/NavigationMenu.jsx";

const NavBar = () => {
    // Scroll section:
    // const [scrolled, setScrolled] = useState(false)
    //
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const isScrolled = window.scrollY > 10 // biến kiểm tra nếu đã scroll trục y hơn 10 pixel
    //         if (isScrolled) {
    //             setScrolled(true)
    //         } else {
    //             setScrolled(false)
    //         }
    //     }
    //     window.addEventListener('scroll', handleScroll)
    //
    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, [scrolled])

    // Popper section:
    const arrowRef = useRef(null);
    const [activeItem, setActiveItem] = useState(null); // tên item đang hover

    const {refs, floatingStyles, context} = useFloating({
        open: !!activeItem,
        onOpenChange: (open) => {
            if (!open) setActiveItem(null);
        },
        middleware: [
            arrow({
                element: arrowRef
            }),
            offset(10),
            flip(),
            shift()
        ],
        // OPTIONAL để cải thiện transition logic
        strategy: 'absolute',
        whileElementsMounted: autoUpdate
    });

    const hover = useHover(context, {
        handleClose: safePolygon({
            requireIntent: false,
        }),
    });

    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover
    ]);

    const { isMounted, styles } = useTransitionStyles(context, {
        duration: { open: 350, close: 300 },
        initial: {
            transform: 'translateX(-24px)',
        },
        open: {
            transform: 'translateX(0)',
        },
        close: {
            transform: 'translateX(24px)',
        },
        common: {
            transitionProperty: 'transform',
            transitionTimingFunction: 'ease-in-out',
        },
    });

    // const navLinks = NavigationMenu()

    return (
        // <header className={`navbar font-semibold ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
        <header className='navbar font-semibold scrolled'>
                    <a href="#hero" className="flex flex-1 items-center">
                        <img src="/assets/images/89y6neiw2h121.png" alt="HomeIcon" className="home-icon" />
                        <div className="navbar-search rounded-search flex-1">
                            <input type="text" placeholder="Search" className="search-input"/>
                            <div className="search-btn-wrapper">
                                <SearchIcon/>
                            </div>
                        </div>
                    </a>

            <div className="flex flex-row flex-1 justify-between items-center list-none gap-2">
                {navLinks.map(({ name, link, icon, content }) => {
                    const Icon = icon;
                    const hasPopper = !!content;
                    const isActive = activeItem?.name === name;

                    return (
                            <li
                                key={name}
                                className="flex h-10 relative"
                                // ref={hasPopper && isActive ? refs.setReference : null}
                                // {...(hasPopper && isActive ? getReferenceProps() : {})}
                                // onMouseEnter={() => {
                                //     if (hasPopper) setActiveItem({ name, content });
                                // }}
                                // {...(hasPopper && isActive ? {} : { onMouseLeave: () => setActiveItem(null) })}
                                ref={(el) => {
                                    // Đảm bảo đúng reference element được set
                                    if (hasPopper && isActive) refs.setReference(el);
                                }}
                                {...(hasPopper && isActive ? getReferenceProps() : {})}
                                onMouseEnter={() => {
                                    if (!hasPopper) return;
                                    // Delay update activeItem để setReference kịp thời
                                    requestAnimationFrame(() => {
                                        setActiveItem({ name, content });
                                    });
                                }}
                            >
                                <a
                                    href={link}
                                    className="nav-category relative rounded-search flex items-center gap-1"
                                >
                                    <Icon />
                                    <span>{name}</span>
                                </a>
                            </li>
                    );
                })}
                {/* Popper chỉ render 1 lần, dùng activeItem để hiển thị nội dung */}
                {activeItem && isMounted && (
                    <div
                        ref={refs.setFloating}
                        style={{
                            position: floatingStyles.position,
                            top: floatingStyles.top,
                            left: floatingStyles.left,
                            transform: `${floatingStyles.transform} ${styles.transform ?? ''}`,
                            transitionProperty: styles.transitionProperty,
                            transitionTimingFunction: styles.transitionTimingFunction,
                            transitionDuration: styles.transitionDuration,
                        }}
                        {...getFloatingProps()}
                        className="parent-div absolute top-full left-0 z-50 bg-white shadow-lg rounded"
                    >
                        <FloatingArrow ref={arrowRef} context={context} fill="#fff" />
                        {activeItem.content}
                    </div>
                )}
            </div>

            <div className="nav-action">
                    <div className="sign-in-wrapper">
                        <a href="" className="nav-category nav-btn rounded-search">
                            <CastIcon/>
                        </a>
                        <a href="" className="nav-category nav-btn rounded-search">
                            <BookmarksIcon/>
                        </a>
                        <div
                            id="btn-test"
                            className="sign-in-btn h-10 rounded-sign-in"
                        >
                            Sign In
                        </div>
                    </div>
                </div>
        </header>
    )
}

export default NavBar


{/* Popper hiển thị khi isActive */}
{/*{hasPopper && isActive && (*/}
{/*    <div*/}
{/*        ref={refs.setFloating}*/}
{/*        style={floatingStyles}*/}
{/*        {...getFloatingProps()}*/}
{/*        className="absolute top-full left-0 z-50 bg-white shadow-lg rounded"*/}
{/*    >*/}
{/*        <FloatingArrow ref={arrowRef} context={context} fill="#fff" />*/}
{/*        {content}*/}
{/*    </div>*/}
{/*)}*/}

{/*{activeItem && (*/}
{/*    <motion.div*/}
{/*        ref={refs.setFloating}*/}
{/*        style={floatingStyles}*/}
{/*        {...getFloatingProps()}*/}
{/*        className="absolute top-full left-0 z-50 bg-white shadow-lg rounded"*/}
{/*        layout*/}
{/*        transition={{ type: 'spring', damping: 20, stiffness: 300 }}*/}
{/*    >*/}
{/*        <FloatingArrow ref={arrowRef} context={context} fill="#fff" />*/}
{/*        {activeItem.content}*/}
{/*    </motion.div>*/}
{/*)}*/}