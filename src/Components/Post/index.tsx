import {Link} from 'react-router-dom'

import {IPost} from '../../Models/IPost'
import {getPostImage} from '../../Utils/GetPostImage'

import LikeButton from '../LikeButton'
import ShareButton from '../ShareButton'

import styles from './Post.module.scss'

interface PostProps {
  post: IPost;
}

function Post({post} : PostProps) {
  return (
    <article className={styles['post-list__post']}>
      <img
        src={getPostImage(post)}
        alt={post.title}/>

      <figcaption> 
        <h3>
          <Link to={`/posts/${post.date}`}>
            {post.title} - {post.date}
          </Link>
        </h3>

        <p>{post.explanation}</p>

        <div>
          <LikeButton postID={post.date}/>
          <ShareButton post={post}/>
        </div>
      </figcaption> 
    </article>
  )
}

export default Post
