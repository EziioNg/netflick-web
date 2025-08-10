import React, {useEffect, useState} from 'react'

import {useNavigate, useParams} from "react-router-dom";

import MovieInfoSection from "~/pages/MovieItems/MovieInfoSection.jsx";
import MovieBg from "~/pages/MovieItems/MovieBg.jsx";
import Cast from "~/pages/MovieItems/Cast.jsx";
import RatingSection from "~/pages/MovieItems/RatingSection.jsx";
import FeatureSectionContainer from "~/pages/HomeItems/FeatureSection/FeatureSectionContainer.jsx";
import AdventureSectionContainer from "~/pages/HomeItems/AdventureSection/AdventureSectionContainer.jsx";
import XenosSectionContainer from "~/pages/HomeItems/XenosSection/XenosSectionContainer.jsx";
import FantasySectionContainer from "~/pages/HomeItems/FantasySection/FantasySectionContainer.jsx";
import ScifiSectionContainer from "~/pages/HomeItems/ScifiSection/ScifiSectionContainer.jsx";
import ActionSectionContainer from "~/pages/HomeItems/ActionSection/ActionSectionContainer.jsx";
import PageLoader from "~/pages/PageLoader.jsx";
import LoTRSectionContainer from "~/pages/Series/LoTRSection/LoTRSectionContainer.jsx";
import HobbitSectionContainer from "~/pages/Series/HobbitSection/HobbitSectionContainer.jsx";

import {getCategoriesByMovieId, getMovieAPI} from "~/apis/index.js";

const Movie = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Hàm kiểm tra ObjectId hợp lệ (MongoDB 24 ký tự hex)
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    useEffect(() => {
        // Nếu ID không hợp lệ -> chuyển sang trang 404
        if (!isValidObjectId(movieId)) {
            navigate("/404", { replace: true });
            return;
        }

        Promise.all([getMovieAPI(movieId), getCategoriesByMovieId(movieId)])
            .then(([movieData, categoriesData]) => {
                // Nếu movie không tồn tại thì cũng chuyển 404
                if (!movieData) {
                    navigate("/404", { replace: true });
                    return;
                }
                setMovie(movieData);
                setCategories(categoriesData.categories || [])
                setLoading(false);
            })

            .catch(err => {
                console.error("Lỗi khi fetch category/movies: ", err);
                navigate("/404", { replace: true });
            });
    }, [movieId])

    // Loading...
    if (loading) return <PageLoader />;

    return (
        <div className="flex flex-col grow shrink flex-nowrap gap-12 py-6">
            <MovieBg />
            <MovieInfoSection movie={movie} categories={categories} />
            <Cast movie={movie}/>
            <RatingSection movie={movie}/>
            <LoTRSectionContainer />
            <HobbitSectionContainer />
            <FeatureSectionContainer />
            <AdventureSectionContainer />
            <XenosSectionContainer />
            <ScifiSectionContainer />
            <FantasySectionContainer />
            <ActionSectionContainer />
        </div>
    )
}
export default Movie
