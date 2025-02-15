import Footer from '@/components/ui/shared/Footer'
import Navbar from '@/components/ui/shared/Navber'
import React from 'react'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className='min-h-screen'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default CommonLayout
