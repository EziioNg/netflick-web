import { useEffect, useState } from "react";

import LoTRSection from "./LoTRSection.jsx";

import { getSeriesById, getMoviesBySeriesId } from "~/apis/index.js"

const SERIES_ID = "68970a41fe13b2ce71e90c0e";

const LoTRSectionContainer = () => {
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

    return <LoTRSection data={data} />;
};

export default LoTRSectionContainer;
