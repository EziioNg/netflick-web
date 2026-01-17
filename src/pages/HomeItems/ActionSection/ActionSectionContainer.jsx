import { useEffect, useState } from "react";

import ActionSection from "./ActionSection";

import { getCategoryById, getMoviesByCategoryId } from "~/apis/index.js";

const CATEGORY_ID = "6874ca16346bbf62467bee98";

const ActionSectionContainer = () => {
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

  return <ActionSection data={data} />;
};

export default ActionSectionContainer;
