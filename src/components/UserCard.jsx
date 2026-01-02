import React from 'react'

const UserCard = ({ user, isEditable = false }) => {
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
                            <button className="btn btn-primary">Ignore</button>
                            <button className="btn btn-secondary">Interested</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserCard