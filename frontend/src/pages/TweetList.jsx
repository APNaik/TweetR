import React, { useEffect, useState } from 'react'
import { fetchTweets } from '../api/api'

export default function TweetList() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    fetchTweets().then(data => setTweets(data)).catch(() => {})
  }, [])

  return (
    <main className="container">
      <h2>Tweets</h2>
      {tweets.length === 0 && <p className="small">No tweets yet</p>}
      {tweets.map(t => (
        <div className="card tweet" key={t.id}>
          <img className="avatar" src={`https://i.pravatar.cc/150?u=${t.user.id}`} alt="avatar" />
          <div className="body">
            <div className="meta"><strong>{t.user.username}</strong> · <span className="small">{new Date(t.created_at).toLocaleString()}</span></div>
            <div>{t.text}</div>
            {t.photo && <img className="photo" src={t.photo} alt="tweet-img" />}
          </div>
        </div>
      ))}
    </main>
  )
}
