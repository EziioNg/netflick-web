import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";

import MovieInfoSection from "~/pages/MovieItems/MovieInfoSection.jsx";
import MovieBg from "~/pages/MovieItems/MovieBg.jsx";
import Cast from "~/pages/MovieItems/Cast.jsx";
import RatingSection from "~/pages/MovieItems/RatingSection.jsx";
import AdventureSection from "~/pages/HomeItems/AdventureSection.jsx";
import XenosSection from "~/pages/HomeItems/XenosSection.jsx";
import ScifiSection from "~/pages/HomeItems/ScifiSection.jsx";
import FantasySection from "~/pages/HomeItems/FantasySection.jsx";
import ActionSection from "~/pages/HomeItems/ActionSection.jsx";
import {getMovieAPI} from "~/apis/index.js";

const Movie = () => {
    //API here....
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        // console.log("API calling...")
        getMovieAPI(movieId)
            .then(data => {
                // console.log('data received: ', data);
                setMovie(data);
            })
            .catch(err => {
                console.error('Error getting movie: ', err);
            });
    }, [movieId]);

    return (
        <div className="flex flex-col grow shrink flex-nowrap gap-12 py-6">
            <MovieBg />
            <MovieInfoSection />
            <Cast movie={movie}/>
            <RatingSection movie={movie}/>
            <AdventureSection />
            <XenosSection />
            <ScifiSection />
            <FantasySection />
            <ActionSection />
        </div>
    )
}
export default Movie
