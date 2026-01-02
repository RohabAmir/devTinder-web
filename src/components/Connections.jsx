import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addConnection } from '../utils/connectionSlice';
import axios from 'axios';
import { useToast } from '../utils/toastProvider';
import { IoPersonCircleOutline, IoCalendarOutline, IoTransgenderOutline } from 'react-icons/io5';

const Connections = () => {
    const connection = useSelector(state => state.connection);
    const dispatch = useDispatch();
    const apiUrl = import.meta.env.VITE_API_URL;
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);

    const fetchConnections = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${apiUrl}/user/connections`, { withCredentials: true });
            if (res.status === 200) {
                dispatch(addConnection(res.data.data));
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Failed to fetch connections');
        } finally {
            setLoading(false);
        }
    }, [apiUrl, dispatch, showToast]);

    useEffect(() => {
        fetchConnections();
    }, [fetchConnections]);

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='loading loading-spinner loading-lg text-primary'></div>
                    <p className='text-gray-500 text-lg'>Loading connections...</p>
                </div>
            </div>
        );
    }

    if (!connection || connection.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4'>
                <div className='text-center max-w-md'>
                    <div className='mb-6'>
                        <IoPersonCircleOutline size={80} className='mx-auto text-gray-400' />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-700 mb-3'>No Connections Yet</h2>
                    <p className='text-gray-500 text-lg'>Start swiping to make connections!</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-[calc(100vh-4rem)] py-8 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold text-white mb-2'>
                        My Connections
                    </h1>
                    <p className='text-gray-400 text-lg'>
                    <span className='rounded-full bg-gray-600 text-white px-2 text-sm'>{connection.length}</span> {connection.length === 1 ? 'connection' : 'connections'}
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {connection.map((conn) => {
                        const { firstName, lastName, photoUrl, age, gender, about, _id } = conn;
                        const fullName = `${firstName} ${lastName}`;

                        return (
                            <div
                                key={_id}
                                className='bg-base-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2'
                            >
                                <div className='relative h-64 bg-linear-to-br from-pink-400 to-red-400 overflow-hidden'>
                                    
                                    <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                </div>

                                <div className='p-6'>
                                    <div className='flex items-center justify-center -mt-16 mb-4 relative z-10'>
                                        <div className='relative'>
                                            <img
                                                src={photoUrl || 'https://via.placeholder.com/120'}
                                                alt={fullName}
                                                className='w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover'
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/120';
                                                }}
                                            />
                                            <div className='absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white'></div>
                                        </div>
                                    </div>

                                    <div className='text-center mb-4'>
                                        <h3 className='text-xl line-clamp-1 font-bold text-white mb-1'>
                                            {fullName}
                                        </h3>

                                        <div className='flex items-center justify-center gap-4 text-sm text-gray-400 mt-2'>
                                            {age && (
                                                <div className='flex items-center gap-1'>
                                                    <IoCalendarOutline size={16} />
                                                    <span>{age} years</span>
                                                </div>
                                            )}
                                            {gender && (
                                                <div className='flex items-center gap-1'>
                                                    <IoTransgenderOutline size={16} />
                                                    <span className='capitalize'>{gender}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {about && (
                                        <div className='mt-4 pt-4 border-t border-gray-600'>
                                            <p className='text-neutral-content text-sm line-clamp-3 leading-relaxed'>
                                                {about}
                                            </p>
                                        </div>
                                    )}

                                    <div className='mt-6 flex gap-2'>
                                        <button className='flex-1 btn border border-gray-300  text-white py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95'>
                                            View Profile
                                        </button>
                                        <button className='px-4 py-2.5 border border-gray-300 text-neutral-content rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-500 transition-all duration-200'>
                                            <IoPersonCircleOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Connections