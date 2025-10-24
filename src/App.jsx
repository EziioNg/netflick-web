import {Routes, Route, Navigate, Outlet} from 'react-router-dom'

import {useSelector} from 'react-redux'

import ScrollToTop from '~/components/ScrollToTop.jsx'

import MainLayout from './layouts/MainLayout'
import MovieLayout from './layouts/MovieLayout'
import WatchLayout from '~/layouts/WatchLayout.jsx'

import Home from './pages/Home'
import Movie from './pages/Movie'
import Watch from './pages/Watch'
import Category from './pages/Category'
import NotFound from '~/pages/404/NotFound.jsx'
import Auth from '~/pages/Auth/Auth.jsx'
import User from '~/pages/User/User.jsx'

import {selectCurrentUser} from '~/redux/user/userSlice.js'
import AccountVerification from '~/pages/Auth/AccountVerification.jsx'

const ProtectedRoute = ({user}) => {
    // console.log('user: ', user)
    if (!user) return <Navigate to='/login' replace={true}/> // nếu user không tồn tại(chưa login) thì đá về trang login
    return <Outlet/> // đến route children
}

function App() {
    const currentUser = useSelector(selectCurrentUser) // lấy thông tin user từ kho dữ liệu redux

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

                {/* Login - Reister */}
                <Route path='/login' element={<Auth/>} />
                <Route path='/register' element={<Auth/>} />
                <Route path='/account/verification' element={<AccountVerification />} />
                <Route path='/forgot-password' element={<Auth/>} />
                <Route path='/reset-password/:token' element={<Auth/>} />

                {/* User Page */}
                <Route element={<ProtectedRoute user={currentUser} />}>
                    <Route
                        path='/user/:tab?'
                        element={
                            <MainLayout>
                                <User/>
                            </MainLayout>
                        }
                    />
                </Route>

                {/* 404 page */}
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default App
