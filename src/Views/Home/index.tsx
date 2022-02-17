import React from 'react'

import {IPost} from '../../Models/IPost'
import {useLoader} from '../../Hooks/UseLoader'
import {sleep} from '../../Utils/Sleep'

import Loading from '../../Components/Loading'
import Post from '../../Components/Post'

import './Home.scss'

function Home() {
  const [posts, setPost] = React.useState<IPost[]>([])
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

      <main>
        <section className="post-list">
          {
            !loading ? 
              posts.map((post) => 
                <Post key={post.date} post={post}/> 
              )
              : <Loading/>
          }
        </section>
      </main>
    </>
  )
}

export default Home
