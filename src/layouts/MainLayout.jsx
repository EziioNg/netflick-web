import React from 'react'

import NavBar from '~/components/NavBar'
import Take from '~/components/Take'
// import San from '~/components/San'
import Footer from '~/components/Footer'

const MainLayout = ({ children }) => {
    return (
        <>
            <div className="flex flex-col min-h-screen ub-corner-gradients">
                <NavBar/>
                <main className="flex flex-col pt-16 pb-14 flex-1 ub-corner-gradients gap-12">
                    {children}
                </main>
                <Take/>
                {/*<San/>*/}
                <Footer/>
            </div>
        </>
    )
}

export default MainLayout