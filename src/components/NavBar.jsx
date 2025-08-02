import {
    useState,
    useRef
} from "react"

import CastIcon from '@mui/icons-material/Cast';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SearchBox from "~/components/SearchBox.jsx";

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

import {navLinks} from "~/constants/NavLinks/index.jsx"

const NavBar = () => {
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

    const {isMounted, styles} = useTransitionStyles(context, {
        duration: {open: 350, close: 300},
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

    return (
        <header className='navbar font-semibold scrolled'>
            <div className="flex flex-1 items-center">
                <a href="/home">
                    <img src="/assets/images/89y6neiw2h121.png" alt="HomeIcon" className="home-icon"/>
                </a>
                <div className="navbar-search rounded-search">
                    <SearchBox className="navbar-search rounded-search"/>
                </div>
            </div>

            <div className="flex flex-row flex-1 justify-between items-center list-none gap-2">
                {navLinks.map(({name, link, icon, content}) => {
                    const Icon = icon;
                    const hasPopper = !!content;
                    const isActive = activeItem?.name === name;

                    return (
                        <li
                            key={name}
                            className="flex h-10 relative"
                            ref={(el) => {
                                // Đảm bảo đúng reference element được set
                                if (hasPopper && isActive) refs.setReference(el);
                            }}
                            {...(hasPopper && isActive ? getReferenceProps() : {})}
                            onMouseEnter={() => {
                                if (!hasPopper) return;
                                // Delay update activeItem để setReference kịp thời
                                requestAnimationFrame(() => {
                                    setActiveItem({name, content});
                                });
                            }}
                        >
                            <a
                                href={link}
                                className="nav-category relative rounded-search flex items-center gap-1"
                            >
                                <Icon/>
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
                        <FloatingArrow ref={arrowRef} context={context} fill="#fff"/>
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
                    <a
                        id="btn-test"
                        href="/404"
                        className="sign-in-btn h-10 rounded-sign-in"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </header>
    )
}

export default NavBar
