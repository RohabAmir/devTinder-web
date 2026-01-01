import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user || {};
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="User photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-2xl ">{firstName + " " + lastName}</h2>
                { age && gender && <p className='text-sm text-gray-500 '>{age} years old, {gender}</p>}
                { about && <p className='text-sm text-white font-mono'>{about}</p>}
                <div className="card-actions flex gap-2 justify-center my-4">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard