import {useEffect, useState} from "react";

import HeroSection from "~/pages/HomeItems/HeroSection.jsx";
import WhatOnSection from "~/pages/HomeItems/WhatOnSection.jsx";
import FeatureSection from "~/pages/HomeItems/FeatureSection/FeatureSection.jsx";
import AdventureSection from "~/pages/HomeItems/AdventureSection/AdventureSection.jsx";
import XenosSection from "~/pages/HomeItems/XenosSection/XenosSection.jsx";
import ComingSoonSection from "~/pages/HomeItems/ComingSoonSection.jsx";
import Categories from "~/pages/HomeItems/Categories.jsx";
import ScifiSection from "~/pages/HomeItems/ScifiSection/ScifiSection.jsx";
import FantasySection from "~/pages/HomeItems/FantasySection/FantasySection.jsx";
import ActionSection from "~/pages/HomeItems/ActionSection/ActionSection.jsx";
import PageLoader from "~/pages/PageLoader.jsx";

import { getCategories, getCategoryById, getMoviesByCategoryId } from "~/apis/index.js"

const Home = () => {
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(true);

    // Dữ liệu movies theo category
    const [sectionsData, setSectionsData] = useState({
        feature: null,
        adventure: null,
        xenos: null,
        scifi: null,
        fantasy: null,
        action: null
    });

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getCategories(),
            getCategoryAndMovies("686b74eb2b65be5c804297f2"),
            getCategoryAndMovies("6874c84d346bbf62467bee89"),
            getCategoryAndMovies("6874c95c346bbf62467bee95"),
            getCategoryAndMovies("6874c96d346bbf62467bee96"),
            getCategoryAndMovies("6874c98d346bbf62467bee97"),
            getCategoryAndMovies("6874ca16346bbf62467bee98"),
        ])
            .then(([catData, feature, adventure, xenos, scifi, fantasy, action]) => {
                setCategories(catData.categories);
                setSectionsData({
                    feature,
                    adventure,
                    xenos,
                    scifi,
                    fantasy,
                    action
                });
            })
            .catch(err => console.error("Lỗi khi load trang chủ:", err))
            .finally(() => setLoading(false));
    }, []);

    // Loading...
    if (loading) return <PageLoader />;

    return (
        <>
            <HeroSection />
            <FeatureSection data={sectionsData.feature} />
            <Categories categories={categories} loading={loading} />
            <AdventureSection data={sectionsData.adventure} />
            <XenosSection data={sectionsData.xenos} />
            <ScifiSection data={sectionsData.scifi} />
            <FantasySection data={sectionsData.fantasy} />
            <ActionSection data={sectionsData.action} />
            <WhatOnSection />
            <ComingSoonSection />
        </>
    )
}

// Hàm hỗ trợ gọi song song category + movies
async function getCategoryAndMovies(categoryId) {
    const [category, moviesRes] = await Promise.all([
        getCategoryById(categoryId),
        getMoviesByCategoryId(categoryId),
    ]);

    return {
        categoryName: category.name,
        movies: moviesRes.movies || [],
    };
}

export default Home