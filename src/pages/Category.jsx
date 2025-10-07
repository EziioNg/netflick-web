import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {getCategoriesByMovieId, getCategoryById, getMovieAPI, getMoviesByCategoryId} from "~/apis/index.js";
import MoviesSection from "~/pages/CategoryItems/MoviesSection.jsx";
import XenoSection from "~/pages/HomeItems/XenoSection.jsx";
import HeroSection from "~/pages/HomeItems/HeroSection.jsx";
import ScifiSection from "~/pages/HomeItems/ScifiSection.jsx";
import AdventureSection from "~/pages/HomeItems/AdventureSection.jsx";
import FantasySection from "~/pages/HomeItems/FantasySection.jsx";
import ActionSection from "~/pages/HomeItems/ActionSection.jsx";
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

    // Map ID → Component section tương ứng
    const sectionMap = {
        "686b74eb2b65be5c804297f2": HeroSection,
        "6874c95c346bbf62467bee95": XenoSection,
        "6874ca16346bbf62467bee98": ActionSection,
        "6874c96d346bbf62467bee96": ScifiSection,
        "6874c84d346bbf62467bee89": AdventureSection,
        "6874c98d346bbf62467bee97": FantasySection,
    };

    // Chọn component phù hợp, nếu không có ID khớp thì dùng default
    const SectionComponent = sectionMap[categoryId] || (() => null);
    
    return (
        <>
            {/*{categoryId === "6874ca16346bbf62467bee98" ? <HeroSection /> : <XenoSection />}*/}
            <SectionComponent />
            <MoviesSection movies={movies} category={category}/>
        </>
    )
}

export default Category