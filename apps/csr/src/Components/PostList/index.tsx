import React from 'react'

import {usePosts} from '~/Context/PostContext'

import Loading from '../Loading'
import Post from '../Post'
import RocketAnimation from '../RocketAnimation'
import LoadButton from '../LoadButton'

function PostList() {
  const {posts, loading, totalPosts} = usePosts()

  return (
    <section className="post-list">
      {
        loading ? 
          <Loading/>
          : posts?.length ?
            <>
              {
                posts.map((post) => 
                  <Post key={post.date} post={post}/> 
                )
              }
              {
                posts.length != totalPosts &&
                  <LoadButton/>
              }
            </>
            : <RocketAnimation text={'No Posts Found'}/>
      }
    </section>
  )
}

export default PostList
