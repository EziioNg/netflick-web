import React from 'react'

const AdventureSection = () => {
    return (
        <main className="hero-section-container">
            <div className="hero-content">
                <div className="hero hero-height">
                    <div className="hero-video hero-mask">
                        <video className="video" autoPlay={true} loop={true} playsInline={true} muted={true}
                               src="https://netflick1.b-cdn.net/Shorts.mp4">
                        </video>
                    </div>

                    <div className="hero-quote max-h-[345.93px]">
                        <div className="hero-text-content max-h-[345.93px]">
                            <div className="hero-text">
                                <h1 className="grow-0 shrink text-[43.9502px] text-white max-h-[57.93px] font-bold">Adventure Movies & TV Shows</h1>
                                <div className="w-[100%] text-left max-h-[72px]">
                                    <span className="flow-root text-[17.4898px] font-medium text-white-take">
                                        A lonely town, bandits, and a man with no name conjure up scenes from the best western movies of all time. Adventure is calling, so saddle up and get ready to hit the dusty trail with the heroes and villains of the Old West, Plex style.
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="text-2xl italic text-text-muted font-bold">~DevilMayCry~</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default AdventureSection
