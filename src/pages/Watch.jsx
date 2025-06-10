import { useRef, useState, useEffect } from 'react';

import { formatTime } from "~/utils/helpers.js";

import CastIcon from '@mui/icons-material/Cast';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const Watch = () => {
    const videoRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    // Load metadata và update time
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleTimeUpdate = () => {
            if (!isSeeking) setCurrentTime(video.currentTime);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [isSeeking]);

    // Play / Pause toggle
    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    // Volume
    const handleVolumeChange = (e) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        setIsMuted(vol === 0);
        if (videoRef.current) {
            videoRef.current.volume = vol;
        }
    };
    const toggleMute = () => {
        if (volume !== 1) setVolume(1)
        if (volume === 1) setVolume(0)
        setIsMuted(!isMuted)
    }

    // Seek timeline
    const handleSeekStart = () => setIsSeeking(true);
    const handleSeekChange = (e) => setCurrentTime(Number(e.target.value));
    const handleSeekEnd = (e) => {
        const time = Number(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
        }
        setIsSeeking(false);
    };

    // Fullscreen
    const handleFullScreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await videoRef.current?.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error('Failed to toggle fullscreen:', err);
        }
    };

    return (
        <div className="relative min-h-screen group">
            <div className="mv-upper">
                <div className="flex flex-row flex-nowrap items-center justify-between h-8 pl-4">
                    <div className="flex flex-row flex-nowrap grow-0 shrink items-center gap-6">
                        <img src="/assets/images/89y6neiw2h121.png" alt="HomeIcon" className="mv-watch-icon" />
                        <span className="grow-0 shrink overflow-hidden text-base font-normal text-text-default">Zatoichi: The Blind Swordsman - Season 1 Episode 1</span>
                    </div>
                    <div className="flex flex-row flex-nowrap grow-0 shrink">
                        <div className="mv-watch-share-icon rounded-search">
                            <a href="" className="flex flex-row flex-nowrap grow-0 shrink items-center justify-center">
                                <CastIcon fontSize="medium"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute w-full h-full" onClick={togglePlay}>
                <video
                    ref={videoRef}
                    className="absolute w-full h-full"
                    src="/movie.mp4"
                    autoPlay
                    loop
                    controls={false}
                    muted={isMuted}
                    volume={volume}
                />
            </div>

            <div className="mv-lower">
                <div className="flex flex-col flex-nowrap gap-2">
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeekChange}
                        onMouseDown={handleSeekStart}
                        onMouseUp={handleSeekEnd}
                        onTouchStart={handleSeekStart}
                        onTouchEnd={handleSeekEnd}
                        className="mv-timespan"
                    />

                    <div className="flex flex-row grow-0 shrink flex-nowrap justify-between">
                        <span className="grow-0 shrink overflow-hidden text-text-default text-xs font-normal">
                            {formatTime(currentTime)}
                        </span>
                        <span className="grow-0 shrink overflow-hidden text-text-default text-xs font-normal">
                            {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        {/* Volume */}
                        <div className="flex flex-row grow-0 shrink-0 justify-start w-[33.33%]">
                            <div className="flex items-center gap-1">
                                <span className="mb-bar-item-medium rounded-search" onClick={toggleMute}>
                                    {isMuted ? <VolumeOffIcon fontSize="medium"/> : <VolumeUpIcon fontSize="medium"/>}
                                </span>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="h-1 w-24 text-text-default cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Play / Pause */}
                        <div className="flex flex-row grow-0 shrink-0 justify-center w-[33.33%]">
                            <button onClick={togglePlay} className="mb-bar-item-large rounded-search">
                                {isPlaying ? <PauseIcon fontSize="large"/> : <PlayArrowIcon fontSize="large"/>}
                            </button>
                        </div>

                        {/* Fullscreen */}
                        <div className="flex flex-row grow-0 shrink-0 justify-end w-[33.33%]">
                            <button onClick={handleFullScreen} className="mb-bar-item-medium rounded-search">
                                <OpenInFullIcon fontSize="medium"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watch
