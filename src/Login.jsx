import React, { useEffect, useState } from 'react'
import { SiTinder } from 'react-icons/si'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'

const Login = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL

  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState({
    visible: false,
    type: 'success',
    message: ''
  })
  const toastTimeoutRef = React.useRef(null)

  const showToast = (type, message, duration = 3000) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
      toastTimeoutRef.current = null
    }
    setToast({ visible: true, type, message })
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }))
      toastTimeoutRef.current = null
    }, duration)
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/login`,
        {
          emailId,
          password
        },
        { withCredentials: true }
      )
      if (res.status === 200) {
        const message = res.data?.message || 'Login successful'
        showToast('success', message)
        setTimeout(() => onClose(), 600)
      }
    } catch (error) {
      console.error('Login failed:', error)
      const errMsg = error?.response?.data?.error
      showToast('error', errMsg)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = e => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black/50  transition-opacity'
        onClick={onClose}
      />

      <div
        role='dialog'
        aria-modal='true'
        className='relative z-10 w-full max-w-md mx-4 transform transition-all duration-300 scale-100 opacity-100'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex justify-center items-center'>
          <div className='card bg-base-300 text-primary-content w-96 shadow-xl py-9 px-11'>
            <div className='card-body p-0'>
              <a className='cursor-pointer flex justify-center mb-4'>
                <SiTinder size={36} color='#ff6b6b' />
              </a>

              <button
                aria-label='Close'
                onClick={onClose}
                className='btn btn-ghost btn-sm absolute right-0 top-2'
              >
                <IoClose size={28} color='#656E7B' />
              </button>

              <h2 className='card-title  text-3xl justify-center'>
                Get Started
              </h2>
              <p className='text-center my-2 mb-6'>
                By clicking "Continue", you agree to our{' '}
                <span className='text-blue-400 underline'>
                  Terms of Service{' '}
                </span>
                and{' '}
                <span className='text-blue-400 underline'>Privacy Policy.</span>
              </p>
              <label className='input validator my-2'>
                <svg
                  className='h-[1em] opacity-50'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <g
                    strokeLinejoin='round'
                    strokeLinecap='round'
                    strokeWidth='2.5'
                    fill='none'
                    stroke='currentColor'
                  >
                    <rect width='20' height='16' x='2' y='4' rx='2'></rect>
                    <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
                  </g>
                </svg>
                <input
                  type='email'
                  value={emailId}
                  onChange={e => setEmailId(e.target.value)}
                  placeholder='Enter your email address'
                  required
                />
              </label>
              <div className='validator-hint hidden'>
                Enter valid email address
              </div>
              <label className='input validator my-2'>
                <svg
                  className='h-[1em] opacity-50'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <g
                    strokeLinejoin='round'
                    strokeLinecap='round'
                    strokeWidth='2.5'
                    fill='none'
                    stroke='currentColor'
                  >
                    <path d='M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z'></path>
                    <circle
                      cx='16.5'
                      cy='7.5'
                      r='.5'
                      fill='currentColor'
                    ></circle>
                  </g>
                </svg>
                <input
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder='Enter a strong password'
                  minlength='8'
                  pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                  title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
                />
              </label>
              <p className='validator-hint hidden'>
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
              <div className='card-actions justify-center mt-10'>
                <button
                  onClick={() => handleLogin()}
                  className='btn  rounded-full px-8 py-3 text-lg font-semibold text-white shadow-lg transform hover:scale-105 transition-all duration-150 bg-linear-to-r from-[#fd267a] via-[#ff6b6b] to-[#ff6036]'
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DaisyUI Toast container */}
      <div
        aria-live='polite'
        className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-end sm:justify-end'
      >
        <div className='flex w-full items-center flex-col space-y-4 sm:items-end'>
          {toast.visible && (
            <div className='pointer-events-auto'>
              <div className={`toast`}>
                <div
                  className={`alert shadow-lg ${
                    toast.type === 'success' ? 'alert-success' : 'alert-error'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className={`stroke-current shrink-0 h-6 w-6 ${
                        toast.type === 'success'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      {toast.type === 'success' ? (
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        />
                      ) : (
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      )}
                    </svg>
                    <span>{toast.message}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
// ...existing code...
