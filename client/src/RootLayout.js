import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function RootLayout() {
    return (
        <div>
            <Navbar />
            <div style={{ minHeight: '80vh',backgroundColor:'lightyellow' }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout