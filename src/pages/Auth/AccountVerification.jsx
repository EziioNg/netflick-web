import { useEffect, useState } from 'react'

import { useSearchParams, Navigate } from 'react-router-dom'

// import Loading from '~/components/Loading/Loading'
import { verifyUserApi } from '~/apis'
import PageLoader from "~/pages/PageLoader.jsx";

function AccountVerification() {
    // lấy email và token từ url
    let [searchParams] = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    //   console.log('email: ', email)
    //   console.log('token: ', token)

    // tạo biến state kiểm tra tài khoản đã verify chưa
    const [verified, setVerified] = useState(false)

    // gọi api để verify tài khoản
    useEffect(() => {
        if (email && token) {
            verifyUserApi({ email, token }).then(() => { setVerified(true) })
        }
    }, [email, token])

    // nếu không có email hoặc token thì về 404
    if (!email || !token) {
        return <Navigate to='/404' />
    }

    // verify chưa xong thì hiện loading
    if (!verified) {
        return <PageLoader />
    }

    // verify thành công thì về login
    return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
