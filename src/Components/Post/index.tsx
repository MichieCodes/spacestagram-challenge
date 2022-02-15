import {IPost} from '../../Models/IPost'
import {getPostImage} from '../../Utils/GetPostImage'

import Button from '../Button'

import styles from './Post.module.scss'

interface PostProps {
  post: IPost;
}

function Post({post} : PostProps) {
  return (
    <article className={styles['post-list__post']}>
      <img src={getPostImage(post)}/>

      <figcaption> 
        <h3>{post.title} - {post.date}</h3>
        <p>{post.explanation}</p>

        <Button onClick={() => console.log(`Liked Post ${post.date}`)}>
          Like
        </Button>
      </figcaption> 
    </article>
  )
}

export default Post
