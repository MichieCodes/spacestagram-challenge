import {usePosts} from '../../Context/PostContext'

import Loading from '../Loading'
import Post from '../Post'
import RocketAnimation from '../RocketAnimation'

function PostList() {
  const {posts, loading} = usePosts()

  return (
    <section className="post-list">
      {
        loading ? 
          <Loading/>
          : posts?.length ?
            posts.map((post) => 
              <Post key={post.date} post={post}/> 
            )
            : <RocketAnimation text={'No Posts Found'}/>
      }
    </section>
  )
}

export default PostList
