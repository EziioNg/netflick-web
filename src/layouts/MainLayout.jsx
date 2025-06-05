import React from 'react'

import NavBar from '~/components/NavBar'
import Take from '~/components/Take'
import Footer from '~/components/Footer'

const MainLayout = ({ children }) => {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-black ub-corner-gradients">
                <NavBar/>
                <main className="flex flex-col pt-[64px] flex-1 ub-corner-gradients gap-12">
                    {children}
                </main>
                <Take/>
                <Footer/>
            </div>
        </>
    )
}

export default MainLayout