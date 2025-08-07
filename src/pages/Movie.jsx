import React, {useEffect, useState} from 'react'

import {useParams} from "react-router-dom";

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

import {getMovieAPI} from "~/apis/index.js";


const Movie = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovieAPI(movieId)
            .then(data => {
                setMovie(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error getting movie: ', err);
            });
    }, [movieId]);

    // Loading...
    if (loading) return <PageLoader />;

    return (
        <div className="flex flex-col grow shrink flex-nowrap gap-12 py-6">
            <MovieBg />
            <MovieInfoSection />
            <Cast movie={movie}/>
            <RatingSection movie={movie}/>
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
