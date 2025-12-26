import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import bg from '../src/assets/images/tinderBgImage.webp'
import Navbar from './Navbar'
import Footer from './Footer'

const Body = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isIndex = location.pathname === '/'

  return (
    <div className=' min-h-screen overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden='true'
      />

      {/* overlay */}
      <div className='absolute inset-0 bg-linear-to-b from-black/40 via-black/40 to-black/60' />

      <header className='relative z-10'>
        <Navbar />
      </header>

      <main className='relative z-10 min-h-screen flex items-center justify-center px-4'>
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
                className='cursor-pointer rounded-full px-8 py-3 text-lg font-semibold text-white shadow-lg transform hover:scale-105 transition-all duration-150
                  bg-linear-to-r from-[#fd267a] via-[#ff6b6b] to-[#ff6036]'
              >
                Create an account
              </button>


              <button
                onClick={() => navigate('/login')}
                className='btn btn-ghost btn-lg  bg-linear-gradient(to top right, #fd267a, #ff6036) rounded-full text-white border-white'
              >
                Log in
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
    </div>
  )
}

export default Body
