import React from 'react'

import NavBar from "~/components/NavBar.jsx";
import Take from "~/components/Take.jsx";
import Footer from "~/components/Footer.jsx";
import ChatBox from "~/components/ChatBox.jsx";

const MovieLayout = ({ children }) => {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-movie">
                <NavBar/>
                <main className="flex flex-col pt-[64px] flex-1 bg-movie gap-12">
                    {children}
                </main>
                <ChatBox />

                <Take/>
                {/*<San/>*/}
                <Footer/>
            </div>
        </>
    )
}
export default MovieLayout
