import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import { ToastProvider } from './utils/toastProvider'
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
