import React from 'react'

import {usePosts} from '~/Context/PostContext'

import Loading from '../Loading'
import Post from '../Post'
import RocketAnimation from '../RocketAnimation'
import LoadButton from '../LoadButton'

function PostList() {
  const {posts : allPosts, loading, page, totalPosts} = usePosts()
  const posts = React.useMemo(() => 
    allPosts.slice(0, 10 * (page + 1)),
    [allPosts, page]
  )

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
                // posts.length != allPosts.length &&
                  <LoadButton/>
              }
            </>
            : <RocketAnimation text={'No Posts Found'}/>
      }
    </section>
  )
}

export default PostList
