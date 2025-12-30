import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import bg from '../assets/images/tinderBgImage.webp'
import Navbar from './Navbar'
import Footer from './Footer'
import Login from './Login'

const Body = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isIndex = location.pathname === '/'
   const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const openHandler = () => setShowLogin(true)
    window.addEventListener('openLogin', openHandler)
    return () => window.removeEventListener('openLogin', openHandler)
  }, [])

  return (
    <div className='relative h-screen overflow-hidden flex flex-col'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden='true'
      />

      {/* overlay */}
      <div className='absolute inset-0 bg-linear-to-b from-black/60 via-black/60 to-black/40' />

      <header className='relative z-10'>
        <Navbar />
      </header>

      <main className='relative z-10 flex-1 flex items-center justify-center px-4'>
        {isIndex ? (
          <section className='text-center text-white max-w-3xl'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4'>
              Welcome to DevTinder.
            </h1>
            <p className='text-xl sm:text-2xl mb-8 font-semibold'>
              Connect with developers who match your skills and vibe.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={() => navigate('/profile')}
                className='cursor-pointer rounded-full px-8 py-3 text-lg font-semibold text-white shadow-lg transform hover:scale-105 transition-all duration-150 bg-linear-to-r from-[#fd267a] via-[#ff6b6b] to-[#ff6036]'
              >
                Create an account
              </button>
            </div>
          </section>
        ) : (
          <div className='w-full'>
            <Outlet />
          </div>
        )}
      </main>

      <footer className='relative z-10'>
        <Footer />
      </footer>

       <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  )
}

export default Body