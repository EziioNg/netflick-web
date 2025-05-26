import React from 'react'

import NavBar from '~/components/NavBar'
import Take from '~/components/Take'
import Footer from '~/components/Footer'

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="pt-[64px] flex-1">
                {children}
            </main>
            <Take />
            <Footer />
        </div>
    )
}

export default MainLayout