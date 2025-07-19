import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMoviesAPI } from "~/apis/index.js";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 0) {
                searchMoviesAPI(query)
                    .then(data => setResults(data))
                    .catch(err => {
                        console.error("Search error:", err);
                        setResults([]);
                    });
            } else {
                setResults([]);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="relative flex flex-row w-full max-w-md"> {/* container có position: relative */}
            <input
                type="text"
                placeholder="Tìm phim..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                // className="px-4 py-2 rounded bg-gray-800 text-white w-full"
                className="search-input"
            />
            <div className="search-btn-wrapper">
                <SearchIcon/>
            </div>

            {results.length > 0 && (
                <ul
                    className="absolute top-full left-0 z-50 bg-menu rounded-b-sm text-text-default text-sm font-normal mt-1 shadow-lg w-[400px] max-h-[380px] overflow-y-auto"
                >
                    {results.map((movie) => (
                        <div className="flex flex-col grow-0 shrink flex-nowrap w-full h-full hover:bg-primary-background-10">
                            <li
                                key={movie._id}
                                className="py-1 px-6 cursor-pointer h-[68px]"
                                onClick={() => {
                                    navigate(`/movies/${movie._id}`)
                                    setQuery("")
                                    setResults([])
                                }}
                            >
                                <div className="flex flex-row grow-0 shrink flex-nowrap justify-normal gap-3 items-center">
                                    <div className="relative max-w-[40px] max-h-[60px] rounded-b-sm overflow-hidden">
                                        <img src={movie.movieImage} className="w-full h-full" alt="movie-image" />
                                    </div>
                                    <div className="flex flex-col grow-0 shrink flex-nowrap justify-normal">
                                        <span className="inline-block text-ellipsis text-white text-sm font-normal max-w-full overflow-hidden wrap-break-word">{movie.title}</span>
                                        <span className="inline-block text-ellipsis text-text-mute text-sm font-normal max-w-full overflow-hidden wrap-break-word">{movie.review}</span>
                                    </div>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBox;
