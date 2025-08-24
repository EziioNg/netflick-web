import {useState} from "react";

const Bookmark = () => {
    const [activeTab, setActiveTab] = useState("movies");

    return (
        <div className="h-full">
            <div className="bm-header">
                <div className="header-title">Bookmarks</div>
                <div className="header-tabs">
                    <button
                        onClick={() => setActiveTab("movies")}
                        className={`tab-item rounded-search transition 
                            ${activeTab === "movies"
                            ? "bg-white text-black opacity-100"
                            : "bg-background-user-bookmark text-white hover:opacity-100"}`}
                    >
                        Movies
                    </button>
                    <button
                        onClick={() => setActiveTab("series")}
                        className={`tab-item rounded-search ml-2.5 transition 
                            ${activeTab === "series"
                            ? "bg-white text-black opacity-100"
                            : "bg-background-user-bookmark text-white hover:opacity-100"}`}
                    >
                        Series
                    </button>
                </div>
            </div>

            {/*<div className="bm-body">*/}
            {/*    {activeTab === "movies" && (*/}
            {/*        <div className="body-none-text">Your Movie Bookmarks</div>*/}
            {/*    )}*/}
            {/*    {activeTab === "series" && (*/}
            {/*        <div className="body-none-text">Your Series Bookmarks</div>*/}
            {/*    )}*/}
            {/*</div>*/}

            <div className="bm-body">
                <div
                    className={`absolute inset-0 transition-opacity duration-150 ease-linear ${
                        activeTab === "movies" ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="body-none-text">Your Movie Bookmarks</div>
                </div>

                <div
                    className={`absolute inset-0 transition-opacity duration-150 ease-linear ${
                        activeTab === "series" ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="body-none-text">Your Series Bookmarks</div>
                </div>
            </div>
        </div>
    )
}
export default Bookmark
