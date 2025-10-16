import { useEffect, useState } from "react"

import PredatorSection from "./PredatorSection.jsx"

import { getSeriesById, getMoviesBySeriesId } from "~/apis/index.js"

const SERIES_ID = "689db6988f7a2d4a9d52636a"

const PredatorSectionContainer = () => {
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

    return <PredatorSection data={data} />;
};

export default PredatorSectionContainer;
