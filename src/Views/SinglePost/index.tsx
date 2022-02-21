import React from 'react'
import {BsFillArrowLeftCircleFill as BsArrow} from 'react-icons/bs'

import {IPost} from '../../Models/IPost'
import {fetchPost} from '../../Services/PostService'
import {useLoader} from '../../Hooks/UseLoader'

import Button from '../../Components/Button'
import Loading from '../../Components/Loading'
import Post from '../../Components/Post'
import RocketAnimation from '../../Components/RocketAnimation'

function SinglePost() {
  const [post, setPost] = React.useState<IPost>()
  const [loading, load] = useLoader()

  const loadPosts = React.useCallback(async () => {
    setPost(await load(fetchPost('2022-02-11')))
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

      <Button style={{marginBottom: '2rem'}}>
        <BsArrow/>
        <span style={{marginLeft: '0.75rem'}}>
          View All Posts
        </span>
      </Button>

      <main>
        <section className="post-list">
          {
            loading ? 
              <Loading/>
              : post ?
                <Post key={post.date} post={post}/> 
                : <RocketAnimation text={'No Posts Found'}/>
          }
        </section> 
      </main>
    </>
  )
}

export default SinglePost