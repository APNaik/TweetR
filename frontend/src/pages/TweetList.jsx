import React, { useEffect, useState } from 'react'
import { fetchTweets, likeTweet, unlikeTweet } from '../api/api'

export default function TweetList() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    loadTweets()
  }, [])

  async function loadTweets() {
    try {
      const data = await fetchTweets()
      setTweets(data)
    } catch (err) {
      console.error('Failed to load tweets', err)
    }
  }

  async function handleLike(tweet) {
    try {
      if (tweet.is_liked) {
        const res = await unlikeTweet(tweet.id)
        setTweets(tweets.map(t => 
          t.id === tweet.id ? { ...t, is_liked: false, likes_count: res.likes_count } : t
        ))
      } else {
        const res = await likeTweet(tweet.id)
        setTweets(tweets.map(t => 
          t.id === tweet.id ? { ...t, is_liked: true, likes_count: res.likes_count } : t
        ))
      }
    } catch (err) {
      console.error('Failed to toggle like', err)
    }
  }

  return (
    <main className="main-content">
      <div className="tweets-container">
        <h2>Latest Tweets</h2>
        {tweets.length === 0 && <p className="small">No tweets yet</p>}
        {tweets.map(t => (
          <div className="card tweet" key={t.id}>
            <img className="avatar" src={`https://i.pravatar.cc/150?u=${t.user.id}`} alt="avatar" />
            <div className="body">
              <div className="meta">
                <strong>{t.user.username}</strong> · 
                <span className="small"> {new Date(t.created_at).toLocaleString()}</span>
              </div>
              <div className="tweet-text">{t.text}</div>
              {t.photo && <img className="photo" src={t.photo} alt="tweet-img" />}
              <div className="tweet-actions">
                <button 
                  className={`like-btn ${t.is_liked ? 'liked' : ''}`}
                  onClick={() => handleLike(t)}
                  title={t.is_liked ? 'Unlike' : 'Like'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span className="like-count">{t.likes_count || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
