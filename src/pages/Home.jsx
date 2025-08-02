import HeroSection from "~/pages/HomeItems/HeroSection.jsx";
import WhatOnSection from "~/pages/HomeItems/WhatOnSection.jsx";
import FeatureSection from "~/pages/HomeItems/FeatureSection.jsx";
import AdventureSection from "~/pages/HomeItems/AdventureSection.jsx";
import XenosSection from "~/pages/HomeItems/XenosSection.jsx";
import ComingSoonSection from "~/pages/HomeItems/ComingSoonSection.jsx";
import Categories from "~/pages/HomeItems/Categories.jsx";
import {useEffect, useState} from "react";
import {getCategories} from "~/apis/index.js";
import PageLoader from "~/pages/PageLoader.jsx";
import ScifiSection from "~/pages/HomeItems/ScifiSection.jsx";
import FantasySection from "~/pages/HomeItems/FantasySection.jsx";
import ActionSection from "~/pages/HomeItems/ActionSection.jsx";

const Home = () => {
    const [categories, setCategories] = useState();
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        setLoadingCategories(true);
        // console.log("API calling...")
        getCategories()
            .then(data => {
                // console.log('data received: ', data);
                setCategories(data.categories);
            })
            .catch(err => {
                console.error('Error getting categories: ', err);
            })
            .finally(() => {
                setLoadingCategories(false);
            });
    }, []);

    //Loading...
    if (loadingCategories) return <PageLoader />;

    return (
        <>
            <HeroSection />
            <FeatureSection />
            <Categories categories={categories} loading={loadingCategories}/>
            <AdventureSection />
            <XenosSection />
            <ScifiSection />
            <FantasySection />
            <ActionSection />
            <WhatOnSection />
            <ComingSoonSection />
        </>
    )
}

export default Home