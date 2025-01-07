import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from 'react-router-dom'
import Layout from './layout.jsx'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Globalfeed from './pages/globalfeed.jsx'
import Personaldata from './pages/personaldata.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import Landing from './pages/Landing.jsx'
import './assets/index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/globalfeed" element={<Globalfeed />} />
      <Route path="/personaldata" element={<Personaldata />} />
      <Route path="profile" element={<Profile />} />
      <Route path="about" element={<About />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
