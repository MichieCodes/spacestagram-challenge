import React from 'react'

import {IPost} from '../../Models/IPost'
import {sleep} from '../../Utils/Sleep'
import {LoadAction, usePostReducer} from '../../Reducers/PostReducer'
import {useLoader} from '../../Hooks/UseLoader'

import Loading from '../../Components/Loading'
import Post from '../../Components/Post'

import './Home.scss'

function Home() {
  const [posts, postDispatch] = usePostReducer()
  const [loading, load] = useLoader()

  const loadPosts = React.useCallback(async () => {
    const data : IPost[] = await load(
      new Promise(async (resolve) => {
        await sleep(3000)

        resolve(
          fetch('../../../data/apod.json')
          .then((res) => res.json())
        )
      })
    )

    postDispatch<LoadAction>('LOAD_POSTS', data)
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

      <main>
        <section className="post-list">
          {
            loading ? 
              <Loading/>
              : posts.map((post) => 
                <Post key={post.date} post={post}/> 
              )
          }
        </section>
      </main>
    </>
  )
}

export default Home
