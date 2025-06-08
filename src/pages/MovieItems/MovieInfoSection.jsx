import React from 'react'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';

import mockMovie1 from "~/constants/MoviesMockDatas/mockMovie1.js";

const MovieInfoSection = () => {
    return (
        <div className="flex flex-row flex-nowrap grow-0 shrink items-start justify-start gap-12 w-[1392.800px] h-[450px] z-[999] px-16">
            <div className="relative flex w-[300px] h-[450px] shrink-0 bg-background-card overflow-hidden">
                <div className="absolute flex items-stretch justify-stretch inset-0">
                    <img src={mockMovie1.imageUrl} alt="mv-img"/>
                </div>
            </div>
            <div className="flex flex-col grow-0 shrink flex-nowrap gap-8">
                <div className="flex flex-col grow-0 shrink flex-nowrap gap-4">
                    <div className="items-start grow-0 shrink flex-nowrap">
                        <h1 className="text-white text-left text-[32px] font-bold">Zatoichi Monogatari</h1>
                    </div>
                    <div className="flex flex-col grow-0 shrink flex-nowrap gap-1">
                        <div className="flex flex-row grow-0 shrink flex-nowrap items-center justify-start gap-3">
                            <span className="text-white-take text-left grow-0 shrink text-sm font-normal">
                                <span>1974</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span>45m</span>
                            </span>
                            <span className="text-white-take text-left grow-0 shrink text-sm font-normal">
                                <a href="">Action,</a>
                                &nbsp;&nbsp;
                                <a href="">Adventure,</a>
                                &nbsp;&nbsp;
                                <button className="movie-more-btn">
                                    <span>and more</span>
                                </button>
                            </span>
                        </div>
                        <div className="inline-flex flex-row h-[16px] w-[44.89x]">
                            <div className="w-[24.66px]">
                                <img className="w-auto h-[16px]" src="/imdb-icon.svg" alt=""/>
                            </div>
                            <span className="text-xs font-semibold text-white">8.0</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row grow-0 shrink flex-nowrap h-12 gap-1">
                    <a href="" className="relative inline-flex grow-0 shrink justify-center px-4 text-text-on-focus bg-background-focus rounded-search">
                        <div className="flex flex-row grow-0 shrink flex-nowrap justify-center items-center gap-1">
                            <PlayArrowIcon fontSize="large"/>
                            <span className="inline-block overflow-hidden text-base font-semibold">Watch Free</span>
                        </div>
                    </a>
                    <div className="flex flex-row grow-0 shrink flex-nowrap gap-2 justify-center items-center max-h-12">
                        <div className="p-3 movie-btn rounded-search max-h-12">
                            <BookmarkBorderIcon />
                        </div>
                        <div className="p-3 movie-btn rounded-search max-h-12">
                            <CheckCircleOutlineIcon className="translate-y-[-0.5px]"/>
                        </div>
                        <div className="p-3 movie-btn rounded-search max-h-12">
                            <IosShareIcon className="translate-y-[-1.5px]"/>
                        </div>
                    </div>
                </div>
                <div className="flex grow-0 shrink flex-nowrap items-start max-w-[700px]">
                    <span className="text-base font-normal text-white">
                        Blind masseur Zatôichi travels from town to town gambling, drinking, and fighting off the local gangs.
                    </span>
                </div>
            </div>
        </div>
    )
}
export default MovieInfoSection
