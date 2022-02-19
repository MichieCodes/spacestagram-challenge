import React from 'react'

import {usePostDispatcher} from '../../Context/PostContext'
import {LoadAction} from '../../Reducers/PostReducer'

import DatePicker from '../../Components/DatePicker'
import PostList from '../../Components/PostList'

import './Home.scss'

function Home() {
  const postDispatch = usePostDispatcher()

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

      <DatePicker/>

      <main>
        <PostList/>
      </main>
    </>
  )
}

export default Home
