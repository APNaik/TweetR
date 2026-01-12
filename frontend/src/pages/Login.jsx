import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      await login(username, password)
      // reload app state so App.jsx will fetch user
      window.location.href = '/'
    } catch (err) {
      const msg = err?.response?.data || err.message || 'Login failed'
      alert(JSON.stringify(msg))
    }
  }

  return (
    <main className="main-content">
      <div className="container">
        <div className="card">
          <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="form-row">
            <button className="btn" type='submit'>Login</button>
          </div>
        </form>
        </div>
      </div>
    </main>
  )
}
