import {Routes, Route, Navigate} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import MovieLayout from './layouts/MovieLayout'
import WatchLayout from "~/layouts/WatchLayout.jsx";
import Home from './pages/Home'
import Movie from './pages/Movie'
import Watch from './pages/Watch'
import Category from './pages/Category'
import NotFound from "~/pages/404/NotFound.jsx";
import ScrollToTop from "~/components/ScrollToTop.jsx";

function App() {
    return (
        <>
            <ScrollToTop/>
            <Routes>
                {/* Redirect Routes */}
                <Route path='/' element={
                    <Navigate to='/home' replace={true}/>
                }/>

                {/* Home Page */}
                <Route path='/home' element={
                    <MainLayout>
                        <Home/>
                    </MainLayout>
                }/>

                {/* Category Page */}
                <Route path='/category/:categoryId' element={
                    <MainLayout>
                        <Category/>
                    </MainLayout>
                }/>

                {/* Movie Details */}
                <Route path='/movies/:movieId' element={
                    <MovieLayout>
                        <Movie/>
                    </MovieLayout>
                }/>

                {/* Watch Page */}
                <Route path='/movies/watch/:movieId' element={
                    <WatchLayout>
                        <Watch/>
                    </WatchLayout>
                }/>

                {/* 404 page */}
                <Route path='*' element={<NotFound />} />

                {/* Login - Reister */}
            </Routes>
        </>
    )
}

export default App
