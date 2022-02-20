import React from 'react'
import {ImHeart} from 'react-icons/im'

import {joinClassnames} from '../../Utils/JoinClassnames'
import {usePostDispatcher, usePosts} from '../../Context/PostContext'
import {LikeAction} from '../../Reducers/PostReducer'

import Button from '../Button'

import styles from './LikeButton.module.scss'

type HeartState = 'heart-icon--show' | 'heart-icon--hide'

interface LikeButtonProps {
  postID : string
}

function LikeButton({postID} : LikeButtonProps) {
  const {likes} = usePosts()
  const postDispatcher = usePostDispatcher()
  const liked = React.useMemo(() => likes[postID], [likes, postID])

  const heartState : HeartState  = liked ? 'heart-icon--show' : 'heart-icon--hide'
  const heartClasses : string = joinClassnames(
    styles['heart-icon'], styles[heartState]
  )

  const handleClick = () => {
    postDispatcher<LikeAction>('LIKE_POST', postID)
  }

  return (
    <Button
      className={liked ? styles['button--liked'] : undefined}
      onClick={handleClick}>
      <ImHeart className={heartClasses}/>
      <span>{liked ? 'Liked' : 'Like'}</span>
    </Button>
  )
}

export default LikeButton
