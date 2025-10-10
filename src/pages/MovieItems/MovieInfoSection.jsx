import {Navigate, useNavigate, Link } from 'react-router-dom'

import {useSelector} from "react-redux";

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import IosShareIcon from '@mui/icons-material/IosShare'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

import {selectCurrentUser} from '~/redux/user/userSlice'
import {addFavoriteAPI, removeFavoriteAPI} from "~/apis/index.js";
import {toast} from "react-toastify";

const MovieInfoSection = ({movie, categories}) => {
    // Navigate
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser)

    const handleAddFavorite = async () => {
        if (!currentUser) {
            // chưa login → điều hướng sang login
            navigate('/login')
            return
        }

        try {
            const res = await addFavoriteAPI(currentUser._id, movie._id)
            toast.success(res.message)
        } catch (err) {
            if (err.response?.status === 409) {
                toast.info('This movie is already in your favorites')
            } else {
                toast.error('Failed to add favorite')
            }
        }
    }

    const handleDeleteFavorite = async () => {
        if (!currentUser) {
            // chưa login → điều hướng sang login
            navigate('/login')
            return
        }

        try {
            const res = await removeFavoriteAPI(currentUser._id, movie._id)
            toast.success(res.message)
        } catch (err) {
            if (err.response?.status === 404) {
                toast.info('This movie is not in your favorites')
            } else {
                toast.error('Failed to remove favorite')
            }
        }
    }

    if (!movie) return <Navigate to='/404' replace={true} />

    return (
        <div className="flex flex-row flex-nowrap grow-0 shrink items-start justify-start gap-12 w-[1392.800px] h-[450px] z-[999] px-16">
            <div className="relative flex w-[300px] h-[450px] shrink-0 bg-background-card overflow-hidden">
                <div className="absolute flex items-stretch justify-stretch inset-0">
                    <img className="w-full object-cover" src={movie.movieImage} alt="mv-img"/>
                </div>
            </div>
            <div className="flex flex-col grow-0 shrink flex-nowrap gap-8">
                <div className="flex flex-col grow-0 shrink flex-nowrap gap-4">
                    <div className="items-start grow-0 shrink flex-nowrap">
                        <h1 className="text-white text-left text-[32px] font-bold">{movie.title}</h1>
                    </div>
                    <div className="flex flex-col grow-0 shrink flex-nowrap gap-1">
                        <div className="flex flex-row grow-0 shrink flex-nowrap items-center justify-start gap-3">
                            <span className="text-white-take text-left grow-0 shrink text-sm font-normal">
                                <span>2025</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span>69m</span>
                            </span>
                            <span className="text-white-take text-left grow-0 shrink text-sm font-normal">
                              {categories.slice(0, 10).map((cat, index, arr) => (
                                  <a
                                      href="#"
                                      key={cat._id}
                                      onClick={(e) => {
                                          e.preventDefault();
                                          navigate(`/category/${cat._id}`);
                                      }}
                                  >
                                      {cat.name}
                                      {index < arr.length - 1 ? ',  ' : ''}
                                  </a>
                              ))}
                            </span>
                        </div>
                        <div className="inline-flex flex-row h-[16px] w-[44.89x]">
                            <div className="w-[24.66px]">
                                <img className="w-auto h-[16px]" src="/imdb-icon.svg" alt="imdb"/>
                            </div>
                            <span className="text-xs font-semibold text-white">8.0</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row grow-0 shrink flex-nowrap h-12 gap-1">
                    <a href="" className="relative inline-flex grow-0 shrink justify-center px-4 text-text-on-focus bg-background-focus rounded-search">
                        <Link
                            // onClick={() => navigate(`/movies/watch/${movie._id}`)}
                            to={`/movies/watch/${movie._id}`}
                            className="flex flex-row grow-0 shrink flex-nowrap justify-center items-center gap-1"
                        >
                            <PlayArrowIcon fontSize="large"/>
                            <span className="inline-block overflow-hidden text-base font-semibold">Watch Free</span>
                        </Link>
                    </a>
                    <div className="flex flex-row grow-0 shrink flex-nowrap gap-2 justify-center items-center max-h-12">
                        <div className="p-3 movie-btn rounded-search max-h-12" onClick={handleAddFavorite}>
                            <BookmarkBorderIcon />
                        </div>
                        <div className="p-3 movie-btn rounded-search max-h-12" onClick={handleDeleteFavorite}>
                            <BookmarkRemoveIcon className="translate-y-[-0.5px]"/>
                        </div>
                        <div className="p-3 movie-btn rounded-search max-h-12">
                            <IosShareIcon className="translate-y-[-1.5px]"/>
                        </div>
                    </div>
                </div>
                <div className="flex grow-0 shrink flex-nowrap items-start max-w-[700px]">
                    <span className="text-base font-normal text-white">
                        {movie.description}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default MovieInfoSection
