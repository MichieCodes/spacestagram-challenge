import React from 'react'

import {IPost} from '../../Models/IPost'

import Post from '../../Components/Post'

import './Home.scss'

function Home() {
  const [posts, setPost] = React.useState<IPost[]>([])

  const loadPosts = React.useCallback(async () => {
    const res = await fetch('../../../data/apod.json')
    const data : IPost[] = await res.json()

    setPost(data)
  }, [])

  React.useEffect(() => {
    loadPosts() 
  }, [])

  return (
    <>
      <header>
        <h1>Spacetagram</h1>
        <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>
      </header>

      <section className="post-list">
        {
          posts.length ? 
            posts.map((post) => 
              <Post key={post.date} post={post}/> 
            )
            : 'Loading...'
        }
      </section>
    </>
  )
}

export default Home