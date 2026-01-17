const FantasySection = () => {
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
              src="https://netflick1.b-cdn.net/xenos.mp4"
            ></video>
          </div>

          <div className="hero-quote max-h-[345.93px]">
            <div className="hero-text-content max-h-[345.93px]">
              <div className="hero-text">
                <h1 className="grow-0 shrink text-[43.9502px] text-white max-h-[57.93px] font-bold">
                  Alive a Life
                </h1>
                <div className="w-[100%] text-left max-h-[72px]">
                  <span className="flow-root text-[17.4898px] font-medium text-white-take">
                    Anh vẫn thường hay mơ thứ không có trên đời...
                  </span>
                </div>
              </div>

              <div className="hero-btn rounded-full">
                <span className="text-base font-semibold">Sign In</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default FantasySection;
