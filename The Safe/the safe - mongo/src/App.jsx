import { useState } from 'react'
import Manager from './components/Manager'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'


function App() {
  
  const router = createBrowserRouter([
    
    {
    path:"/",
    element:<>
    <Navbar/><Manager/></>
    },
    {
    path:"/Login",
    element:<><Login/></>
    },
  ])
  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}

export default App
