import { Link, useParams } from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import HistoryIcon from "@mui/icons-material/History";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import LogoutIcon from "@mui/icons-material/Logout";

import {logoutUserAPI, selectCurrentUser} from '~/redux/user/userSlice'

import Bookmark from "~/pages/User/Bookmark.jsx"
import Account from "~/pages/User/Account.jsx";

const User = () => {
    const { tab } = useParams();

    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutUserAPI())
    }

    const renderContent = () => {
        switch (tab) {
            case "favorite":
                return <Bookmark/>;
            case "playlist":
                return <h2>Your Playlists</h2>;
            case "leftovers":
                return <h2>Continue Watching...</h2>;
            case "noti":
                return <h2>Notifications</h2>;
            case "account":
                return <Account/>;
            default:
                return <h2>Welcome, choose a section</h2>;
        }
    };

    return (
        <div className="user-section">
            {/* Side menu */}
            <div className="user-side">
                <div className="side-menu">
                    <div className="side-menu-text">Account Management</div>
                    <div className="menus">
                        <Link to="/user/favorite" className="menu-item">
                            <div className="text-center">
                                <FavoriteIcon />
                                <span>Bookmarks</span>
                            </div>
                        </Link>
                        <Link to="/user/playlist" className="menu-item">
                            <div className="text-center">
                                <PlaylistPlayIcon />
                                <span>Playlists</span>
                            </div>
                        </Link>
                        <Link to="/user/leftovers" className="menu-item">
                            <div className="text-center">
                                <HistoryIcon />
                                <span>Leftovers</span>
                            </div>
                        </Link>
                        <Link to="/user/noti" className="menu-item">
                            <div className="text-center">
                                <NotificationsIcon />
                                <span>Notifications</span>
                            </div>
                        </Link>
                        <Link to="/user/account" className="menu-item">
                            <div className="text-center">
                                <PersonIcon />
                                <span>Account</span>
                            </div>
                        </Link>
                    </div>

                    {/* User info */}
                    <div className="infos">
                        <div className="info-avatar rounded-search cursor-pointer">
                            <img
                                className="avatar"
                                // src="https://res.cloudinary.com/doam999z1/image/upload/v1752230418/3vjpg_aemnc5.jpg"
                                src={currentUser?.avatar}
                                alt="avatar"
                            />
                        </div>
                        <div className="info-texts">
                            <div className="user-name">
                                <span className="text-sm font-normal text-static-grey-9">{currentUser?.displayName}</span>
                                <AllInclusiveIcon />
                            </div>
                            <div className="user-subname">{currentUser?.email}</div>
                            <a className="user-logout" href="/home" onClick={handleLogout}>
                                <LogoutIcon />
                                <span>Log Out</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="user-main">
                {renderContent()}
            </div>
        </div>
    );
};

export default User;
