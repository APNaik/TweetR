import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout, loadToken, getUser } from './api/api'

export default function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // load token from storage into axios headers
    loadToken()
    getUser().then(u => setUser(u)).catch(() => setUser(null))
  }, [])

  async function doLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <header className="app-header">
      <div className="container">
        <div className="nav">
          <div className="center">
            <Link to='/' className="logo">TweeTR</Link>
            <Link to='/create' className="small">Create</Link>
          </div>
          <div className="spacer" />
          {user ? (
            <div className="center">
              <span className="small">Hi, <strong>{user.username}</strong></span>
              <button className="btn" style={{marginLeft:12}} onClick={doLogout}>Logout</button>
            </div>
          ) : (
            <div className="center">
              <Link to='/register' className="small">Register</Link>
              <Link to='/login' style={{marginLeft:8}} className="small">Login</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
