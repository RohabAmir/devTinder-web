import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import bg from '../assets/images/tinderBgImage.webp'
import Navbar from './Navbar'
import Footer from './Footer'
import Login from './Login'
import Signup from './Signup'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import { useToast } from '../utils/toastProvider'

const Body = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { showToast } = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/profile/view`, {
          withCredentials: true
        })
        dispatch(addUser(res.data.data))
      } catch (err) {
        if (err.response && err.response.status === 401) {
          showToast('error', err.response.data || 'Please log in to continue')
          navigate('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const openHandler = () => setShowLogin(true)
    window.addEventListener('openLogin', openHandler)
    return () => window.removeEventListener('openLogin', openHandler)
  }, [])

  if (isLoading) {
    return (
      <div className='relative h-screen overflow-hidden flex flex-col items-center justify-center'>
        <span className="loading loading-dots loading-xl text-white"></span>
      </div>
    )
  }

  return (
    <div className='relative h-screen overflow-hidden flex flex-col'>
      {!userData && (
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden='true'
        />
      )}

      <div className='absolute inset-0 bg-linear-to-b from-black/60 via-black/60 to-black/40' />

      <header className='relative z-10'>
        <Navbar />
      </header>

      <main className='relative z-10 flex-1 flex items-center justify-center px-4 pb-20 overflow-y-auto'>
        {!userData ? (
          <section className='text-center text-white max-w-3xl'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4'>
              Welcome to DevTinder.
            </h1>
            <p className='text-xl sm:text-2xl mb-8 font-semibold'>
              Connect with developers who match your skills and vibe.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={() => setShowSignup(true)}
                className='cursor-pointer rounded-full px-8 py-3 text-lg font-semibold text-white shadow-lg transform hover:scale-105 transition-all duration-150 bg-linear-to-r from-[#fd267a] via-[#ff6b6b] to-[#ff6036]'
              >
                Create an account
              </button>
            </div>
          </section>
        ) : (
          <div className='w-full h-full'>
            <Outlet />
          </div>
        )}
      </main>

      <footer className='relative z-10'>
        <Footer />
      </footer>

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} />
    </div>

  )
}

export default Body
