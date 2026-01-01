import React from 'react'
import { SiTinder } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../utils/toastProvider'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'


const Navbar = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL
  const dispatch = useDispatch();
  const { showToast } = useToast()


  const handleLogout = async () => {
    try {
      const res = await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true })
      if (res.status === 200) {
        showToast('success', 'Logged out successfully')
        dispatch(removeUser())
        return navigate('/login')
      }
    } catch (error) {
      showToast('error', error.response.data.error || 'Something went wrong')
      navigate('/login')
    }
  }
  return (
    <div className='navbar bg-base-100 shadow-lg'>
      <div className='flex items-center gap-2 ml-4 flex-1'>
        <Link to='/' className='btn btn-ghost text-2xl'>
          <SiTinder size={32} color='#ff6b6b' />
          DevTinder
        </Link>
      </div>
      <div className='flex gap-2 mr-4'>
        {user ? (
          <div className='dropdown dropdown-end mx-5 flex'>
            <p className='flex items-center justify-center mr-4'>
              Welcome, {user.firstName}
            </p>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <img alt='User Avatar' src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-1 w-52 p-2 shadow'
            >
              <li>
                <Link to='/profile' className='justify-between'>
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate('/login'),
                window.dispatchEvent(new CustomEvent('openLogin'))
            }}
            className='btn cursor-pointer rounded-full px-10 py-2 text-lg font-semibold text-black border border-white bg-white hover:bg-transparent hover:text-white transition-colors'
          >
            Log in
          </button>
        )}
      </div>

    </div>

  )
}

export default Navbar
