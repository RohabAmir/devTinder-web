import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  return useContext(ToastContext)
}

let idCounter = 0

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((type, message, duration = 3000) => {
    const id = ++idCounter
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const value = { showToast }

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast container - bottom-right on desktop, centered bottom on small screens */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-4 z-60 flex flex-col items-center sm:items-end space-y-3 px-4"
      >
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <div className={`toast`}>
              <div className={`alert shadow-lg ${t.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-current h-5 w-5 ${t.type === 'success' ? 'text-green-600' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24">
                    {t.type === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    )}
                  </svg>
                  <span>{t.message}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}