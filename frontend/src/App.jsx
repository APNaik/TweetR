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
    <header style={{padding: 20}}>
      <nav>
        <Link to='/'>Home</Link> | <Link to='/create'>Create</Link> |
        {user ? (
          <>
            <span style={{marginLeft:8}}>Hi, {user.username}</span>
            <button style={{marginLeft:8}} onClick={doLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/register'>Register</Link> | <Link to='/login'>Login</Link>
          </>
        )}
      </nav>
    </header>
  )
}
