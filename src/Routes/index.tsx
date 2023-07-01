import { createBrowserRouter } from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import HomeLayout from '../layouts/HomeLayout'
import Profile from '../Pages/Profile'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <HomeLayout />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
])
