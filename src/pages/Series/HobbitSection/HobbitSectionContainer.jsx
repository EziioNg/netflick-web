import { useEffect, useState } from "react";

import HobbitSection from "./HobbitSection.jsx";

import { getSeriesById, getMoviesBySeriesId } from "~/apis/index.js"

const SERIES_ID = "68970a27fe13b2ce71e90c0d";

const HobbitSectionContainer = () => {
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

    return <HobbitSection data={data} />;
};

export default HobbitSectionContainer;
