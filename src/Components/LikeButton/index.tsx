import React, {MouseEventHandler} from 'react'
import {ImHeart} from 'react-icons/im'

import {joinClassnames} from '../../Utils/JoinClassnames'

import Button, {ButtonProps} from '../Button'

import styles from './LikeButton.module.scss'

type HeartState = 'heart-icon--show' | 'heart-icon--hide'

function LikeButton({onClick} : ButtonProps) {
  const [liked, setLiked] = React.useState(false)

  const heartState : HeartState  = liked ? 'heart-icon--show' : 'heart-icon--hide'
  const heartClasses : string = joinClassnames([
    styles['heart-icon'], styles[heartState]
  ])

  const handleClick : MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick && onClick(e)

    setLiked((prevValue) => !prevValue)
  }

  return (
    <Button onClick={handleClick}>
      <ImHeart className={heartClasses}/>
      <span>{liked ? 'Liked' : 'Like'}</span>
    </Button>
  )
}

export default LikeButton
