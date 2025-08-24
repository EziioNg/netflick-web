/* eslint-disable no-console */
// TrungQuanDev: https://youtube.com/@trungquandev
import { Navigate, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'

import { useSelector } from 'react-redux'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { selectCurrentUser } from '~/redux/user/userSlice'

function Auth() {
    const location = useLocation()
    // console.log(location)
    const isLogin = location.pathname === '/login' // lấy param login từ url
    const isRegister = location.pathname === '/register' // lấy param register từ url

    const currentUser = useSelector(selectCurrentUser) // lấy thông tin user từ kho dữ liệu redux
    console.log('currentUser: ', currentUser)
    // Nếu user đã login thì chuyển tới / khi vào trang login hoặc register
    if (currentUser) {
        return <Navigate to='/user' replace={true} />
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // background: 'url("src/assets/auth/login-register-bg.jpg")',
            background: 'url(https://res.cloudinary.com/doam999z1/image/upload/v1752048346/eddy-gonzalez-davila-1111_c49zvs.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
        }}>
            {/* render form login hoặc register tùy theo url */}
            {isLogin && <LoginForm />}
            {isRegister && <RegisterForm />}
        </Box>
    )
}

export default Auth