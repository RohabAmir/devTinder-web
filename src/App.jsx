import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './Body'
import Login from './Login'
import Profile from './Profile'
import { ToastProvider } from './toastProvider'
import { appStore } from './utils/appStore'
import { Provider } from 'react-redux'

function App () {
  return (
    <>
      <Provider store={appStore}>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Body />}>
                <Route path='login' element={<Login />} />
                <Route path='profile' element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </Provider>
    </>
  )
}

export default App
