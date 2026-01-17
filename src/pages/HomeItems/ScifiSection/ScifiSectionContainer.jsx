import { useEffect, useState } from "react";

import ScifiSection from "./ScifiSection";

import { getCategoryById, getMoviesByCategoryId } from "~/apis/index.js";

const CATEGORY_ID = "6874c96d346bbf62467bee96";

const ScifiSectionContainer = () => {
  const [data, setData] = useState({ categoryName: "", movies: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCategoryById(CATEGORY_ID),
      getMoviesByCategoryId(CATEGORY_ID),
    ])
      .then(([category, moviesRes]) => {
        setData({
          categoryName: category.name,
          movies: moviesRes.movies || [],
        });
      })
      .catch((err) => console.error("Error loading adventure section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return <ScifiSection data={data} />;
};

export default ScifiSectionContainer;
