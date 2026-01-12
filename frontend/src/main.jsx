import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'
import TweetList from './pages/TweetList'
import CreateTweet from './pages/CreateTweet'
import OnlineUsers from './components/OnlineUsers'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app-layout">
        <App />
        <div className="content-wrapper">
          <Routes>
            <Route path='/' element={<TweetList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreateTweet />} />
          </Routes>
          <OnlineUsers />
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
)
