import LoginPage from '@/pages/login/LoginPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
    
        <Route path='/login' element={<LoginPage/>} />
    </Routes>
  )
}

export default AppRouter