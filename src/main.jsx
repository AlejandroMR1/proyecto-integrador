import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from "./components/Header"
import Login from "./pages/auth/Login"
import Home from "./pages/features/Home"


import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Employees from './pages/features/Employees'
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
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
