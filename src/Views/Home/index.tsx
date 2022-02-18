import React from 'react'

import {LoadAction, usePostReducer} from '../../Reducers/PostReducer'

import DatePicker from '../../Components/DatePicker'
import Loading from '../../Components/Loading'
import Post from '../../Components/Post'
import RocketAnimation from '../../Components/RocketAnimation'

import './Home.scss'

function Home() {
  const [{posts, loading}, postDispatch] = usePostReducer()

  const loadPosts = React.useCallback(async () => {
    postDispatch<LoadAction>('LOAD_POSTS')
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

      <DatePicker postDispatch={postDispatch}/>

      <main>
        <section className="post-list">
          {
            loading ? 
              <Loading/>
              : posts.length ?
                posts.map((post) => 
                  <Post key={post.date} post={post}/> 
                )
                : <RocketAnimation text={'No Posts Found'}/>
          }
        </section>
      </main>
    </>
  )
}

export default Home
