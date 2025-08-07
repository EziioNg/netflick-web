import { useEffect, useState } from "react";

import FeatureSection from "./FeatureSection";

import { getCategoryById, getMoviesByCategoryId } from "~/apis/index.js"

const CATEGORY_ID = "686b74eb2b65be5c804297f2";

const FeatureSectionContainer = () => {
    const [data, setData] = useState({ categoryName: "", movies: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getCategoryById(CATEGORY_ID),
            getMoviesByCategoryId(CATEGORY_ID)
        ])
            .then(([category, moviesRes]) => {
                setData({
                    categoryName: category.name,
                    movies: moviesRes.movies || []
                });
            })
            .catch(err => console.error("Error loading adventure section:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    return <FeatureSection data={data} />;
};

export default FeatureSectionContainer;
