import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {getCategoriesByMovieId, getCategoryById, getMovieAPI, getMoviesByCategoryId} from "~/apis/index.js";
import MoviesSection from "~/pages/CategoryItems/MoviesSection.jsx";
import XenoSection from "~/pages/HomeItems/XenoSection.jsx";
import HeroSection from "~/pages/HomeItems/HeroSection.jsx";
import FantasySection from "~/pages/HomeItems/FantasySection/FantasySection.jsx";
import PageLoader from "~/pages/PageLoader.jsx";

const Category = () => {
    const { categoryId } = useParams();
    const [movies, setMovies] = useState([])
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hàm kiểm tra ObjectId hợp lệ (MongoDB 24 ký tự hex)
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
    
    const navigate = useNavigate();

    useEffect(() => {
        // Nếu ID không hợp lệ -> chuyển sang trang 404
        if (!isValidObjectId(categoryId)) {
            navigate("/404", { replace: true });
            return;
        }

        Promise.all([getCategoryById(categoryId), getMoviesByCategoryId(categoryId)])
            .then(([categoryData, moviesData]) => {
                if (!categoryData) {
                    navigate("/404", { replace: true });
                    return;
                }
                setCategory(categoryData);
                setMovies(moviesData.movies || [])
                setLoading(false);
            })

            .catch(err => {
                console.error("Lỗi khi fetch category/movies: ", err);
                navigate("/404", { replace: true });
            });
    }, [categoryId])

    // Loading...
    if (loading) return <PageLoader />;
    
    return (
        <>
            {categoryId === "6874ca16346bbf62467bee98" ? <HeroSection /> : <XenoSection />}
            <MoviesSection movies={movies} category={category}/>
        </>
    )
}

export default Category