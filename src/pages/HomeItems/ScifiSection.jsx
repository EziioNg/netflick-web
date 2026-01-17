const ScifiSection = () => {
  return (
    <main className="hero-section-container">
      <div className="hero-content">
        <div className="hero hero-height">
          <div className="hero-video hero-mask">
            <video
              className="video"
              autoPlay={true}
              loop={true}
              playsInline={true}
              muted={true}
              src="https://d1clq3aq3ibfkf.cloudfront.net/videoplayback.mp4"
            ></video>
          </div>

          <div className="hero-quote max-h-[345.93px]">
            <div className="hero-text-content max-h-[345.93px]">
              <div className="hero-text">
                <h1 className="grow-0 shrink text-[43.9502px] text-white max-h-[57.93px] font-bold">
                  Sci-Fi Movies & TV Shows
                </h1>
                <div className="w-[100%] text-left max-h-[72px]">
                  <span className="flow-root text-[17.4898px] font-medium text-white-take">
                    Sci-fi movies can take us to distant worlds and reveal
                    fantastic futures beyond belief. Time-traveling cyborgs,
                    dystopian futures, and more are here for you to discover.
                    Grab some popcorn and head into adventure.
                  </span>
                </div>
              </div>
              <div>
                <span className="text-2xl italic text-text-muted font-bold">
                  ~DevilMayCry~
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ScifiSection;
