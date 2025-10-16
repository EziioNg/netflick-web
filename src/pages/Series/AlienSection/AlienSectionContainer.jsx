import { useEffect, useState } from "react"

import AlienSection from "./AlienSection.jsx"

import { getSeriesById, getMoviesBySeriesId } from "~/apis/index.js"

const SERIES_ID = "689b0847ac64d856c5d1b110"

const AlienSectionContainer = () => {
    const [data, setData] = useState({ seriesName: "", movies: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getSeriesById(SERIES_ID),
            getMoviesBySeriesId(SERIES_ID)
        ])
            .then(([series, moviesRes]) => {
                setData({
                    seriesName: series.name,
                    movies: moviesRes.movies || []
                });
            })
            .catch(err => console.error("Error loading section:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    return <AlienSection data={data} />;
};

export default AlienSectionContainer;
