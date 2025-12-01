import React from 'react'

const ActionSection = () => {
    return (
        <main className="hero-section-container">
            <div className="hero-content">
                <div className="hero hero-height">
                    <div className="hero-video hero-mask">
                        <video className="video" autoPlay={true} loop={true} playsInline={true} muted={true}
                               src="https://netflick1.b-cdn.net/NG123.mp4">
                        </video>
                    </div>

                    <div className="hero-quote max-h-[345.93px]">
                        <div className="hero-text-content max-h-[345.93px]">
                            <div className="hero-text">
                                <h1 className="grow-0 shrink text-[43.9502px] text-white max-h-[57.93px] font-bold">Action Movies & TV Shows</h1>
                                <div className="w-[100%] text-left max-h-[72px]">
                                    <span className="flow-root text-[17.4898px] font-medium text-white-take">
                                        Welcome to the edge of your seat, because it's time to dive into the action. From classic westerns and war films to modern action hero adventures, it’s all right here on Plex.
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
export default ActionSection
