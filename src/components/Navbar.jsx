import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { SiTinder } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../utils/toastProvider'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
import { IoPersonOutline,  IoPersonCircleOutline } from 'react-icons/io5'
import { IoLogOutOutline } from 'react-icons/io5'
import { IoPeopleOutline } from 'react-icons/io5'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false)
      }
    }

    const updatePosition = () => {
      if (isDropdownOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right
        })
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      updatePosition()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isDropdownOpen])

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true })
      if (res.status === 200) {
        showToast('success', 'Logged out successfully')
        dispatch(removeUser())
        setIsDropdownOpen(false)
        return navigate('/login')
      }
    } catch (error) {
      showToast('error', error.response.data.error || 'Something went wrong')
      setIsDropdownOpen(false)
      navigate('/login')
    }
  }

  const toggleDropdown = () => {
    if (!isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      })
    }
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <nav className='w-full bg-base-300 shadow-md h-16 flex items-center justify-between px-4 md:px-8 relative z-50'>
      <Link
        to='/'
        className='flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity'
      >
        <SiTinder size={32} color='#ff6b6b' />
        <span className='text-neutral-content'>DevTinder</span>
      </Link>

      <div className='flex items-center gap-4'>
        {user ? (
          <div className='relative'>
            <div className='flex items-center gap-3'>
              <span className='hidden md:block text-white font-medium'>
                Welcome, {user.firstName}
              </span>
              <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className='flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#ff6b6b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:ring-offset-2'
              >
                <img
                  alt='User Avatar'
                  src={user?.photoUrl}
                  className='w-full cursor-pointer h-full object-cover'
                />
              </button>
            </div>

            {isDropdownOpen &&
              createPortal(
                <div
                  ref={dropdownRef}
                  className='fixed w-56 bg-base-100 rounded-lg shadow-xl py-2 z-50'
                  style={{
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`
                  }}
                >
                  <Link
                    to='/profile'
                    onClick={() => setIsDropdownOpen(false)}
                    className='flex items-center justify-between px-4 py-3 text-neutral-content hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer'
                  >
                    <span className='flex items-center gap-2'>
                      <IoPersonOutline size={20} />
                      Profile
                    </span>
                  </Link>
                  <Link
                    to='/connections'
                    onClick={() => setIsDropdownOpen(false)}
                    className='flex items-center justify-between px-4 py-3 text-neutral-content hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer'
                  >
                    <span className='flex items-center gap-2'>
                      <IoPersonCircleOutline size={20} />
                      Connections
                    </span>
                  </Link>
                  <Link
                    to='/requests'
                    onClick={() => setIsDropdownOpen(false)}
                    className='flex items-center justify-between px-4 py-3 text-neutral-content hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer'
                  >
                    <span className='flex items-center gap-2'>
                      <IoPeopleOutline size={20} />
                      Friend Requests
                    </span>
                  </Link>
                  <div className='border-t border-neutral-content my-1' />
                  <button
                    onClick={handleLogout}
                    className='w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-100 hover:text-gray-700 transition-colors cursor-pointer text-left'
                  >
                    <IoLogOutOutline size={20} />
                    Logout
                  </button>
                </div>,
                document.body
              )}
          </div>
        ) : (
          <button
            onClick={() => {
              navigate('/login')
              window.dispatchEvent(new CustomEvent('openLogin'))
            }}
            className='cursor-pointer rounded-full px-6 md:px-10 py-2 text-base md:text-lg font-semibold text-black border border-white bg-white hover:bg-transparent hover:text-white transition-all duration-200'
          >
            Log in
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
