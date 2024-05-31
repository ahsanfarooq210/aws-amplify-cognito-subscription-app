import HomePage from '@/pages/home-page/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
         <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
    </Routes>
  )
}

export default AppRouter