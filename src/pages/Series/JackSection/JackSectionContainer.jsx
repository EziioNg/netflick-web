import { useEffect, useState } from "react"

import JackSection from "./JackSection.jsx"

import { getSeriesById, getMoviesBySeriesId } from "~/apis/index.js"

const SERIES_ID = "689b0872ac64d856c5d1b111"

const JackSectionContainer = () => {
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

    return <JackSection data={data} />;
};

export default JackSectionContainer;
