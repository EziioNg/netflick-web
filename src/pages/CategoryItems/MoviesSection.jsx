import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";

import {getCategoryById, getMoviesByCategoryId} from "~/apis/index.js";

const MoviesSection = () => {
    const [movies, setMovies] = useState([])
    const [categoryName, setCategoryName] = useState("")

    const { categoryId } = useParams();
    useEffect(() => {
        // Call APIs
        Promise.all([getCategoryById(categoryId), getMoviesByCategoryId(categoryId)])
            .then(([categoryData, moviesData]) => {
                setCategoryName(categoryData.name || "Category")
                // setMovies(Array.isArray(moviesData.movies) ? moviesData.movies : [])
                setMovies(moviesData.movies?.movies || [])
            })

            .catch(err => console.error("Lỗi khi fetch category/movies:", err))
    }, [])

    // Navigate
    const navigate = useNavigate();

    return (<div className="px-16">
            <div className="grid grid-cols-5 gap-8">
                {movies.map((item, idx) => (
                    <figure
                        key={idx}
                        onClick={() => navigate(`/movies/${item._id}`)}
                        className="flex flex-col flex-nowrap gap-2 max-w-[223px] max-h-[376px] group cursor-pointer"
                    >
                        <div className="overflow-hidden rounded-lg cursor-pointer group-hover:shadow-[0_0_0_2px_white]">
                            <div className="max-h-[332px] overflow-hidden rounded">
                                <img
                                    className="w-full h-[332px] object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]"
                                    src={item.movieImage}
                                    alt={item.title}
                                />
                            </div>
                        </div>
                        <figcaption className="flex flex-col grow-0 shrink pointer-events-none">
                            <span
                                className="inline-block overflow-hidden text-ellipsis whitespace-nowrap w-[221.33px] text-white text-sm font-normal">
                                {item.title}
                            </span>
                            <span
                                className="inline-flex overflow-hidden overflow-ellipsis whitespace-nowrap text-text-muted text-xs font-semibold min-h-4">
                                {item.review}
                            </span>
                        </figcaption>
                    </figure>))}
            </div>
        </div>);

}
export default MoviesSection
