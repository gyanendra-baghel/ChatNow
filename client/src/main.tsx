import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Chat from './pages/Chat.tsx'
import NotFound from './pages/NotFound.tsx'
import './index.css'
import Logout from './pages/Logout.tsx'
import UserContextProvider from './context/UserContext.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path='/chat/:receiver?' element={<Chat />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='*' element={<NotFound />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
)
