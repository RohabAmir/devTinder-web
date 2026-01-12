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
            <div className='w-full h-full flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='loading loading-spinner loading-lg text-primary'></div>
                    <p className='text-gray-400 text-lg'>Loading connections...</p>
                </div>
            </div>
        );
    }

    if (!connection || connection.length === 0) {
        return (
            <div className='w-full h-full flex items-center justify-center px-4'>
                <div className='text-center max-w-md'>
                    <div className='mb-6'>
                        <IoPersonCircleOutline size={80} className='mx-auto text-gray-400' />
                    </div>
                    <h2 className='text-3xl font-bold text-white mb-3'>No Connections Yet</h2>
                    <p className='text-gray-400 text-lg'>Start swiping to make connections!</p>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full h-full flex flex-col overflow-hidden'>
            <div className='max-w-7xl mx-auto w-full h-full flex flex-col px-4 md:px-8 py-6'>
                <div className='mb-6 shrink-0'>
                    <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
                        My Connections
                    </h1>
                    <p className='text-gray-400 text-base'>
                        <span className='rounded-full bg-gray-600 text-white px-2.5 py-0.5 text-sm font-medium'>{connection.length}</span> {connection.length === 1 ? 'connection' : 'connections'}
                    </p>
                </div>

                <div className='flex-1 overflow-y-auto pr-2'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-4'>
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

                                    <div className='p-5 md:p-6'>
                                        <div className='flex items-center justify-center -mt-14 md:-mt-16 mb-4 relative z-10'>
                                            <div className='relative'>
                                                <img
                                                    src={photoUrl || 'https://via.placeholder.com/120'}
                                                    alt={fullName}
                                                    className='w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-base-200 shadow-xl object-cover'
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/120';
                                                    }}
                                                />
                                                <div className='absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-2 border-base-200'></div>
                                            </div>
                                        </div>

                                        <div className='text-center mb-4'>
                                            <h3 className='text-lg md:text-xl line-clamp-1 font-bold text-white mb-1'>
                                                {fullName}
                                            </h3>

                                            <div className='flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-gray-400 mt-2'>
                                                {age && (
                                                    <div className='flex items-center gap-1'>
                                                        <IoCalendarOutline size={14} className='md:w-4 md:h-4' />
                                                        <span>{age} years</span>
                                                    </div>
                                                )}
                                                {gender && (
                                                    <div className='flex items-center gap-1'>
                                                        <IoTransgenderOutline size={14} className='md:w-4 md:h-4' />
                                                        <span className='capitalize'>{gender}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {about && (
                                            <div className='mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-600'>
                                                <p className='text-neutral-content text-xs md:text-sm line-clamp-3 leading-relaxed'>
                                                    {about}
                                                </p>
                                            </div>
                                        )}

                                        <div className='mt-5 md:mt-6 flex gap-2'>
                                            <button className='flex-1 btn border border-gray-300 text-white py-2 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 transform hover:scale-105 active:scale-95'>
                                                View Profile
                                            </button>
                                            <button className='px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 text-neutral-content rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-500 transition-all duration-200'>
                                                <IoPersonCircleOutline size={18} className='md:w-5 md:h-5' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connections