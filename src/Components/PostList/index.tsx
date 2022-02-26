import {usePosts} from '../../Context/PostContext'

import Loading from '../Loading'
import Post from '../Post'
import RocketAnimation from '../RocketAnimation'
import LoadButton from '../LoadButton'

function PostList() {
  const {posts, loading} = usePosts()

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
              <LoadButton/>
            </>
            : <RocketAnimation text={'No Posts Found'}/>
      }
    </section>
  )
}

export default PostList
