import { useEffect, useState } from "react";

import FantasySection from "./FantasySection";

import { getCategoryById, getMoviesByCategoryId } from "~/apis/index.js";

const CATEGORY_ID = "6874c98d346bbf62467bee97";

const FantasySectionContainer = () => {
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

  return <FantasySection data={data} />;
};

export default FantasySectionContainer;
