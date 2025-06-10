import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import MovieLayout from './layouts/MovieLayout'
import Home from './pages/Home'
import Movie from './pages/Movie'
import Watch from './pages/Watch'
import WatchLayout from "~/layouts/WatchLayout.jsx";

function App() {

  return (
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

          {/* Movies */}
          <Route path='/movies' element={
              <MainLayout>
                  {/*<Home/>*/}
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


          {/* 404 page */}

      </Routes>
  )
}

export default App
