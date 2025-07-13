import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";

import MovieInfoSection from "~/pages/MovieItems/MovieInfoSection.jsx";
import WorthyShowSection from "~/pages/HomeItems/WorthyShowSection.jsx";
import MovieBg from "~/pages/MovieItems/MovieBg.jsx";
import Cast from "~/pages/MovieItems/Cast.jsx";
import RatingSection from "~/pages/MovieItems/RatingSection.jsx";
import {getMovieAPI} from "~/apis/index.js";

const Movie = () => {

    //API here....
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("API calling...")
        getMovieAPI(movieId)
            .then(data => {
                console.log('data received: ', data);
                setMovie(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error getting movie: ', err);
                setLoading(false);
            });
    }, [movieId]);

    return (
        <div className="flex flex-col grow shrink flex-nowrap gap-12 py-6">
            <MovieBg />
            <MovieInfoSection />
            <Cast movie={movie}/>
            <RatingSection movie={movie}/>
            <WorthyShowSection />
            <WorthyShowSection />
            <WorthyShowSection />
            <WorthyShowSection />
        </div>
    )
}
export default Movie
