import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../utils/toastProvider'
import axios from 'axios'
import { addFeed } from '../utils/feedSlide'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);
  const { showToast } = useToast()
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${apiUrl}/feed`, { withCredentials: true })
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      showToast('error', error.response.data.error || 'Something went wrong')
      navigate('/login')
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  return (

    feed && feed.length > 0 && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]} />
      </div>
    )

  )
}

export default Feed;
