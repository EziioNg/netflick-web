import { useEffect, useState } from "react";

import MiddleEarthSection from "./MiddleEarthSection.jsx";

import { getSeriesById, getMoviesBySeriesId } from "~/apis/index.js";

const SERIES_ID = "689709d4fe13b2ce71e90c0c";

const MiddleEarthSectionContainer = () => {
  const [data, setData] = useState({ seriesName: "", movies: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSeriesById(SERIES_ID), getMoviesBySeriesId(SERIES_ID)])
      .then(([series, moviesRes]) => {
        setData({
          seriesName: series.name,
          movies: moviesRes.movies || [],
        });
      })
      .catch((err) => console.error("Error loading section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return <MiddleEarthSection data={data} />;
};

export default MiddleEarthSectionContainer;
