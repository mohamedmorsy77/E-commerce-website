import React from 'react'
import { BrowserRouter , Routes,Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import SignUp from '../Components/signup/SignUp'
import Login from '../Components/login/Login'
import ResetPassword from '../Components/resetPassword/ResetPassword'
import ResetCode from '../Components/resetCode/ResetCode'
import NewPassword from '../Components/newPassword/NewPassword'
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={<Layout />}>
          <Route path='signup' element={<SignUp />}/>
          <Route path='login' element={<Login />}/>
          <Route path='forgetPassword' element={<ResetPassword />}/>
          <Route path='resetCode' element={<ResetCode />}/>
          <Route path='newPassword' element={<NewPassword />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
