import React, { useEffect, useState } from 'react'
import { fetchTweets } from '../api/api'

export default function TweetList() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    fetchTweets().then(data => setTweets(data)).catch(() => {})
  }, [])

  return (
    <main>
      <h2>Tweets</h2>
      {tweets.length === 0 && <p>No tweets yet</p>}
      <ul>
        {tweets.map(t => (
          <li key={t.id}>
            <strong>{t.user.username}</strong>: {t.text}
            {t.photo && <div><img src={t.photo} alt='' style={{maxWidth:200}}/></div>}
          </li>
        ))}
      </ul>
    </main>
  )
}
