import HeroSection from "~/pages/HomeItems/HeroSection.jsx";
import WhatOnSection from "~/pages/HomeItems/WhatOnSection.jsx";
import TuneInSection from "~/pages/HomeItems/TuneInSection.jsx";
import WorthyShowSection from "~/pages/HomeItems/WorthyShowSection.jsx";
import MostPopularSection from "~/pages/HomeItems/MostPopularSection.jsx";
import CrimeTimeSection from "~/pages/HomeItems/CrimeTimeSection.jsx";
import TilDeathSection from "~/pages/HomeItems/TilDeathSection.jsx";
import TrueCrimeTimeSection from "~/pages/HomeItems/TrueCrimeTimeSection.jsx";
import RecentlySection from "~/pages/HomeItems/RecentlySection.jsx";
import MostWatchSection from "~/pages/HomeItems/MostWatchSection.jsx";
import TrendingTrailerSection from "~/pages/HomeItems/TrendingTrailerSection.jsx";
import ComingSoonSection from "~/pages/HomeItems/ComingSoonSection.jsx";

const Home = () => {
    return (
        <>
            <HeroSection />
            <WorthyShowSection />
            <MostPopularSection />
            <CrimeTimeSection />
            <WhatOnSection />
            <ComingSoonSection />
        </>
    )
}

export default Home