import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRequest, removeRequestById } from '../utils/requestSlice'
import { useToast } from '../utils/toastProvider'
import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'
import { IoPersonCircleOutline, IoCheckmarkCircle, IoCloseCircle, IoCalendarOutline, IoTransgenderOutline } from 'react-icons/io5'

const Requests = () => {
    const request = useSelector(state => state.request);
    const dispatch = useDispatch();
    const apiUrl = import.meta.env.VITE_API_URL;
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [processingIds, setProcessingIds] = useState(new Set());

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${apiUrl}/user/requests/recieved`, { withCredentials: true });
            if (res.status === 200) {
                dispatch(addRequest(res.data.data));
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Failed to fetch requests');
        } finally {
            setLoading(false);
        }
    }, [apiUrl, dispatch, showToast]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleAccept = async (status, requestId) => {
        try {
            setProcessingIds(prev => new Set(prev).add(requestId));
            const res = await axios.post(`${apiUrl}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
            if (res.status === 200) {
                dispatch(removeRequestById(requestId));
                showToast('success', res.data.message);
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Failed to accept request');
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };

    const handleReject = async (status, requestId) => {
        try {
            setProcessingIds(prev => new Set(prev).add(requestId));
            const res = await axios.post(`${apiUrl}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
            if (res.status === 200) {
                dispatch(removeRequestById(requestId));
                showToast('success', res.data.message);
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Failed to reject request');
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='loading loading-spinner loading-lg text-primary'></div>
                    <p className='text-gray-400 text-lg'>Loading requests...</p>
                </div>
            </div>
        );
    }

    if (!request || request.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4'>
                <div className='text-center max-w-md'>
                    <div className='mb-6'>
                        <IoPersonCircleOutline size={80} className='mx-auto text-gray-400' />
                    </div>
                    <h2 className='text-3xl font-bold text-white mb-3'>No Requests Yet</h2>
                    <p className='text-gray-400 text-lg'>Start swiping to get requests!</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-[calc(100vh-4rem)] py-8 px-4 md:px-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold text-white mb-2'>
                        Friend Requests
                    </h1>
                    <p className='text-gray-400 text-lg'>
                        <span className='rounded-full bg-gray-600 text-white px-2 text-sm'>{request.length}</span> {request.length === 1 ? 'request' : 'requests'}
                    </p>
                </div>

                <div className='space-y-4'>
                    {request.map((req) => {
                        const { firstName, lastName, photoUrl, age, gender, about, _id } = req.fromUserId;
                        const fullName = `${firstName} ${lastName}`;
                        const isProcessing = processingIds.has(_id);

                        return (
                            <div
                                key={_id}
                                className='bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-700'
                            >
                                <div className='flex flex-col sm:flex-row gap-6'>
                                    <div className='shrink-0 flex justify-center sm:justify-start'>
                                        <div className='relative'>
                                            <img
                                                src={photoUrl || 'https://via.placeholder.com/120'}
                                                alt={fullName}
                                                className='w-24 h-24 rounded-full object-cover border-4 border-gray-600 shadow-lg'
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/120';
                                                }}
                                            />

                                        </div>
                                    </div>

                                    <div className='flex-1 min-w-0'>
                                        <div className='mb-3'>
                                            <h3 className='text-xl font-bold text-white mb-2'>
                                                {fullName}
                                            </h3>

                                            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3'>
                                                {age && (
                                                    <div className='flex items-center gap-1'>
                                                        <IoCalendarOutline size={16} />
                                                        <span>{age} years old</span>
                                                    </div>
                                                )}
                                                {gender && (
                                                    <div className='flex items-center gap-1'>
                                                        <IoTransgenderOutline size={16} />
                                                        <span className='capitalize'>{gender}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {about && (
                                                <p className='text-neutral-content text-sm line-clamp-2 leading-relaxed'>
                                                    {about}
                                                </p>
                                            )}
                                        </div>

                                        <div className='flex flex-col sm:flex-row gap-3 mt-4'>
                                            <button
                                                onClick={() => handleAccept('accepted', req._id)}
                                                disabled={isProcessing}
                                                className=' btn flex-1 sm:flex-initial px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <span className='loading loading-spinner loading-sm'></span>
                                                        <span>Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IoCheckmarkCircle size={20} />
                                                        <span>Accept</span>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleReject('rejected', req._id)}
                                                disabled={isProcessing}
                                                className='flex-1 btn sm:flex-initial px-6 py-2.5 bg-base-300 hover:bg-base-400 text-white border border-gray-600 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <span className='loading loading-spinner loading-sm'></span>
                                                        <span>Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IoCloseCircle size={20} />
                                                        <span>Reject</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
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

export default Requests