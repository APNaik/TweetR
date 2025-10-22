import React, { useState } from 'react'
import { createTweet } from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function CreateTweet() {
  const [text, setText] = useState('')
  const [photo, setPhoto] = useState(null)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('text', text)
    if (photo) fd.append('photo', photo)
    try {
      await createTweet(fd)
      navigate('/')
    } catch (err) {
      const status = err?.response?.status
      if (status === 401 || status === 403) {
        alert('You must be logged in to create a tweet')
        window.location.href = '/login'
        return
      }
      const msg = err?.response?.data || err.message || 'Create failed'
      alert(JSON.stringify(msg))
    }
  }

  return (
    <main>
      <h2>Create Tweet</h2>
      <form onSubmit={submit}>
        <div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder={"What's happening?"}></textarea>
        </div>
        <div>
          <input type='file' accept='image/*' onChange={e => setPhoto(e.target.files[0])} />
        </div>
        <button type='submit'>Post</button>
      </form>
    </main>
  )
}
