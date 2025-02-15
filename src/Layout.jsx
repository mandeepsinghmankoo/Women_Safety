import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {Outlet, useLocation} from 'react-router-dom'
function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet />
    {useLocation().pathname==='/' && <Footer/>}
    </>
  )
}

export default Layout