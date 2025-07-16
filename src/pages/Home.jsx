import HeroSection from "~/pages/HomeItems/HeroSection.jsx";
import WhatOnSection from "~/pages/HomeItems/WhatOnSection.jsx";
import WorthyShowSection from "~/pages/HomeItems/WorthyShowSection.jsx";
import MostPopularSection from "~/pages/HomeItems/MostPopularSection.jsx";
import CrimeTimeSection from "~/pages/HomeItems/CrimeTimeSection.jsx";
import ComingSoonSection from "~/pages/HomeItems/ComingSoonSection.jsx";
import Categories from "~/pages/HomeItems/Categories.jsx";
import {useEffect, useState} from "react";
import {getCategories} from "~/apis/index.js";
import PageLoader from "~/pages/PageLoader.jsx";

const Home = () => {
    const [categories, setCategories] = useState();
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        setLoadingCategories(true);
        console.log("API calling...")
        getCategories()
            .then(data => {
                console.log('data received: ', data);
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
            <WorthyShowSection />
            <Categories categories={categories} loading={loadingCategories}/>
            <MostPopularSection />
            <CrimeTimeSection />
            <WhatOnSection />
            <ComingSoonSection />
        </>
    )
}

export default Home