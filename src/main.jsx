import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from "./components/Header"
import Login from "./pages/auth/Login"
import Home from "./pages/features/Home"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Employees from './pages/features/Employees'
import Attendance from './pages/features/Attendance'



let router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },

  {
    path: "/home",
    element: <Home/>
  },

  {path: "/header",
    element: <Header/>
  },

  {path: "/employees",
    element: <Employees/>
  },

  {
    path: "/attendance",
    element: <Attendance/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
