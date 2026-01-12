import React, { useEffect, useState } from 'react'
import { fetchOnlineUsers } from '../api/api'

export default function OnlineUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
    const interval = setInterval(loadUsers, 30000) // refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  async function loadUsers() {
    try {
      const data = await fetchOnlineUsers()
      setUsers(data)
    } catch (err) {
      // User might not be logged in
      setUsers([])
    }
  }

  if (users.length === 0) return null

  return (
    <div className="online-users-sidebar">
      <div className="sidebar-header">
        <span className="online-indicator"></span>
        <h3>Online Now ({users.length})</h3>
      </div>
      <div className="user-list">
        {users.map(user => (
          <div className="online-user" key={user.id}>
            <img 
              className="avatar-small" 
              src={`https://i.pravatar.cc/40?u=${user.id}`} 
              alt={user.username} 
            />
            <span className="username">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
