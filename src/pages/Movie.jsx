import React from 'react'
import MovieInfoSection from "~/pages/MovieItems/MovieInfoSection.jsx";
import WorthyShowSection from "~/pages/HomeItems/WorthyShowSection.jsx";
import MovieBg from "~/pages/MovieItems/MovieBg.jsx";

const Movie = () => {
    return (
        <div className="flex flex-col grow shrink flex-nowrap gap-12 py-6">
            <MovieBg />
            <MovieInfoSection />
            <WorthyShowSection />
            <WorthyShowSection />
            <WorthyShowSection />
            <WorthyShowSection />
        </div>
    )
}
export default Movie
