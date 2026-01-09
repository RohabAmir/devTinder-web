import React, { useState } from 'react'
import { useToast } from '../utils/toastProvider'
import axios from 'axios'
import { removeUserFeed } from '../utils/feedSlide'
import { useDispatch } from 'react-redux'
const UserCard = ({ user, isEditable = false }) => {
    const apiUrl = import.meta.env.VITE_API_URL
    const { showToast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()


    const handleIgnore = async (status, userId) => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${apiUrl}/request/send/${status}/${userId}`, {}, { withCredentials: true })
            if (res.status === 200) {
                showToast('success', res.data.message)
                dispatch(removeUserFeed(userId))
            }
        } catch (error) {
            showToast('error', error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    const handleInterested = async (status, userId) => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${apiUrl}/request/send/${status}/${userId}`, {}, { withCredentials: true })
            if (res.status === 200) {
                showToast('success', res.data.message)
                dispatch(removeUserFeed(userId))
            }
        } catch (error) {
            showToast('error', error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }


    const { firstName, lastName, photoUrl, age, gender, about } = user || {};
    return (
        <div className="card bg-base-200 w-96 shadow-sm h-full">
            <figure>
                <img
                    className='w-full h-full rounded-t-lg object-cover'
                    src={photoUrl}
                    alt="User photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-2xl ">{firstName + " " + lastName}</h2>
                {age && gender && <p className='text-sm text-gray-500 '>{age} years old, {gender}</p>}
                {about && <p className={`text-sm overflow-y-auto   ${isEditable ? 'mt-10 h-50' : 'mt-2 h-30'}  text-white font-mono`}>{about}</p>}
                {
                    !isEditable && (
                        <div className="card-actions flex gap-2 justify-center my-4 mt-10">
                            <button className="btn btn-primary" onClick={() => handleIgnore('ignored', user._id)} disabled={isLoading}>Ignore</button>
                            <button className="btn btn-secondary" onClick={() => handleInterested('interested', user._id)} disabled={isLoading}>Interested</button>
                            {isLoading && <span className="loading loading-spinner loading-xs"></span>}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserCard