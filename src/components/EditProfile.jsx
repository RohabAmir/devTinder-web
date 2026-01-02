import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useToast } from '../utils/toastProvider'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState(user.about)
    const apiUrl = import.meta.env.VITE_API_URL
    const { showToast } = useToast()
    const dispatch = useDispatch()


    const handleUpdateProfile = async () => {
        try {
            const res = await axios.patch(`${apiUrl}/profile/edit`, {
                firstName,
                lastName,
                photoUrl, age, gender, about
            }, { withCredentials: true })
            if (res.status === 200) {
                showToast('success', 'Profile updated successfully')
                dispatch(addUser(res?.data?.data))
            }
        }
        catch (error) {
            console.log(error);
            showToast('error', error.response.data || 'Something went wrong')
        }
    }

    return (
        <>
            <div className='flex justify-center my-10'>
                <div className='flex justify-center mx-10'>
                    <div className='card bg-base-200 w-96 shadow-2xl'>
                        <div className=''>
                            <h2 className='card-title rounded-t-lg p-2 bg-linear-to-r from-[#fd267a] via-[#ff6b6b] to-[#ff6036] justify-center text-2xl font-bold'>Edit Profile</h2>
                            <div className='card-body px-6'>
                                <div>
                                    <label className='form-control w-full max-w-xs my-2'>
                                        <div className='label'>
                                            <span className='label-text'>First Name:</span>
                                        </div>
                                        <input
                                            type='text'
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            className='input input-bordered w-full max-w-xs my-2'
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className='form-control w-full max-w-xs my-2'>
                                        <div className='label'>
                                            <span className='label-text'>Last Name:</span>
                                        </div>
                                        <input
                                            type='text'
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            className='input input-bordered w-full max-w-xs my-2'
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className='form-control w-full max-w-xs my-2'>
                                        <div className='label'>
                                            <span className='label-text'>Photo URL:</span>
                                        </div>
                                        <input
                                            type='text'
                                            value={photoUrl}
                                            onChange={e => setPhotoUrl(e.target.value)}
                                            className='input input-bordered w-full max-w-xs my-2'
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className='form-control w-full max-w-xs my-2'>
                                        <div className='label'>
                                            <span className='label-text'>Age:</span>
                                        </div>
                                        <input
                                            type='number'
                                            value={age}
                                            onChange={e => setAge(e.target.value)}
                                            className='input input-bordered w-full max-w-xs my-2'
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Gender:</legend>
                                        <select className="select" value={gender} onChange={e => setGender(e.target.value)}>
                                            <option disabled selected>Pick a gender</option>
                                            <option>male</option>
                                            <option>female</option>
                                            <option>other</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div>
                                    <label className='form-control w-full max-w-xs my-2'>
                                        <div className='label'>
                                            <span className='label-text'>About:</span>
                                        </div>
                                        <textarea
                                            value={about}
                                            onChange={e => setAbout(e.target.value)}
                                            className='textarea textarea-bordered h-24 w-full max-w-xs resize-none my-2'
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='card-actions justify-center mt-10'>
                                    <button className='btn btn-primary w-full max-w-xs' onClick={handleUpdateProfile}>Update Profile</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <UserCard isEditable={true} user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
        </>
    )
}

export default EditProfile