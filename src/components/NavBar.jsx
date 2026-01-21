import { useState, useRef, useEffect } from "react";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import CastIcon from "@mui/icons-material/Cast";
// import BookmarksIcon from '@mui/icons-material/Bookmarks'
import PersonIcon from "@mui/icons-material/Person";

import {
  safePolygon,
  useFloating,
  useHover,
  useInteractions,
  FloatingArrow,
  arrow,
  offset,
  flip,
  shift,
  autoUpdate,
  useTransitionStyles,
} from "@floating-ui/react";

import { useDispatch, useSelector } from "react-redux";

import { navLinks } from "~/constants/NavLinks/index.jsx";
import SearchBox from "~/components/SearchBox.jsx";
import { logoutUserAPI, selectCurrentUser } from "~/redux/user/userSlice";

const NavBar = () => {
  // Popper section:
  const arrowRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null); // tên item đang hover

  const { refs, floatingStyles, context } = useFloating({
    open: !!activeItem,
    onOpenChange: (open) => {
      if (!open) setActiveItem(null);
    },
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(10),
      flip(),
      shift(),
    ],
    // OPTIONAL để cải thiện transition logic
    strategy: "absolute",
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    handleClose: safePolygon({
      requireIntent: false,
    }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: { open: 350, close: 300 },
    initial: {
      transform: "translateX(-24px)",
    },
    open: {
      transform: "translateX(0)",
    },
    close: {
      transform: "translateX(24px)",
    },
    common: {
      transitionProperty: "transform",
      transitionTimingFunction: "ease-in-out",
    },
  });

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAPI());
  };

  const navigate = useNavigate();
  const handleUser = () => {
    if (!currentUser)
      toast.error("You have to login first to perform this action");
    if (currentUser) navigate("/user", { replace: true });
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10; // biến kiểm tra nếu đã scroll trục y hơn 10 pixel
      if (isScrolled) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`navbar font-semibold ${scrolled ? "scrolled" : "not-scrolled"}`}
    >
      <div className="flex flex-1 items-center">
        <Link to="/home">
          <img
            src="/assets/images/89y6neiw2h121.png"
            alt="HomeIcon"
            className="home-icon"
          />
        </Link>
        <div className="navbar-search rounded-search">
          <SearchBox className="navbar-search rounded-search" />
        </div>
      </div>

      <div className="flex flex-row flex-1 justify-between items-center list-none gap-2">
        {navLinks.map(({ name, link, icon, content }) => {
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
                  setActiveItem({ name, content });
                });
              }}
            >
              <Link
                to={link}
                className="nav-category relative rounded-search flex items-center gap-1"
              >
                <Icon />
                <span>{name}</span>
              </Link>
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
              transform: `${floatingStyles.transform} ${styles.transform ?? ""}`,
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
          <Link to="#" className="nav-category nav-btn rounded-search">
            <CastIcon />
          </Link>
          {/*<Link to="#" className="nav-category nav-btn rounded-search">*/}
          {/*    <BookmarksIcon/>*/}
          {/*</Link>*/}
          <button
            // to="/user"
            onClick={handleUser}
            className="sign-in-btn h-10 rounded-sign-in"
          >
            <PersonIcon />
          </button>
          {/*<a*/}
          {/*    id="btn-test"*/}
          {/*    href="/404"*/}
          {/*    className="sign-in-btn h-10 rounded-sign-in"*/}
          {/*    onClick={handleLogout}*/}
          {/*>*/}
          {/*    Log out*/}
          {/*</a>*/}
          {currentUser ? (
            <button
              className="sign-in-btn h-10 rounded-sign-in"
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <Link to="/login" className="sign-in-btn h-10 rounded-sign-in">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
