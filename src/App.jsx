import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

function App() {

  return (
    <Routes>
      {/* Redirect Routes */}
      <Route path='/' element={
        <Navigate to='/home' replace={true} />
      } />

      {/* Home */}
      <Route path='/home' element={
        <MainLayout>
          <Home />
        </MainLayout>
      } />

      {/* Board details */}


      {/* Login - Reister */}


      {/* 404 page */}

    </Routes>
  )
}

export default App
