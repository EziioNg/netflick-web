import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {getCategoryById} from "~/apis/index.js";
import MoviesSection from "~/pages/CategoryItems/MoviesSection.jsx";
import XenoSection from "~/pages/HomeItems/XenoSection.jsx";
import HeroSection from "~/pages/HomeItems/HeroSection.jsx";
import FantasySection from "~/pages/HomeItems/FantasySection.jsx";

const Category = () => {
    //API here....
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        // console.log("API calling...")
        getCategoryById(categoryId)
            .then(data => {
                // console.log('data received: ', data);
                setCategory(data);
            })
            .catch(err => {
                console.error('Error getting category: ', err);
            });
    }, [categoryId]);
    return (
        <>
            {categoryId === "6874ca16346bbf62467bee98" ? <HeroSection /> : <XenoSection />}
            <MoviesSection />
        </>
    )
}

export default Category