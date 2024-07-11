import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { handleLogin } from '../store/slices/userSlice'


function LayoutWithNavbar() {
const dispatch = useDispatch()

useEffect(() => { checkToken()}, [])

  const checkToken = () => {
    let token = localStorage.getItem("access_token")
    if (token) {
        let decoded = jwtDecode(token)
        const d = new Date()
        let currentTime = d.getTime() / 1000
        let tokenExprieTime = decoded.exp
        if (tokenExprieTime > currentTime) {
            dispatch(handleLogin(decoded))
        } else {
            localStorage.removeItem("access_token")
        }
    }
}
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default LayoutWithNavbar