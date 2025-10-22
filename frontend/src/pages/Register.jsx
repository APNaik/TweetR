import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { login } from '../api/api'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', { username, password })
      // auto login
      await login(username, password)
      window.location.href = '/'
    } catch (err) {
      const msg = err?.response?.data || err.message || 'Register failed'
      alert(JSON.stringify(msg))
    }
  }

  return (
    <main>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type='submit'>Register</button>
      </form>
    </main>
  )
}
