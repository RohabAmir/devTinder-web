import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../utils/toastProvider'
import axios from 'axios'
import { addFeed } from '../utils/feedSlide'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'
import { IoPersonCircleOutline } from 'react-icons/io5'
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);
  const { showToast } = useToast()
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const getFeed = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${apiUrl}/feed`, { withCredentials: true })
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      showToast('error', error.response.data.error || 'Something went wrong')
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getFeed()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
            <div className='flex flex-col items-center gap-4'>
                <div className='loading loading-spinner loading-lg text-primary'></div>
                <p className='text-gray-400 text-lg'>Loading feed...</p>
            </div>
        </div>
    );
}

  if (!feed || feed.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4'>
        <div className='text-center max-w-md'>
          <div className='mb-6'>
            <IoPersonCircleOutline size={80} className='mx-auto text-gray-400' />
          </div>
          <h2 className='text-3xl font-bold text-white mb-3'>No users in feed</h2>
          <p className='text-gray-400 text-lg'>Start swiping to get users!</p>
        </div>
      </div>
    )
  }

  return (
    feed && (
      <div className='flex justify-center items-center w-full h-full py-8'>
        <UserCard user={feed[0]} />
      </div>
    )

  )
}

export default Feed;
