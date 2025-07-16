import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {getCategoryById} from "~/apis/index.js";
import MoviesSection from "~/pages/CategoryItems/MoviesSection.jsx";
import HeroSection from "~/pages/HomeItems/HeroSection.jsx";

const Category = () => {
    //API here....
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        console.log("API calling...")
        getCategoryById(categoryId)
            .then(data => {
                console.log('data received: ', data);
                setCategory(data);
            })
            .catch(err => {
                console.error('Error getting category: ', err);
            });
    }, [categoryId]);
    return (
        <>
            <HeroSection />
            <MoviesSection />
        </>
    )
}

export default Category