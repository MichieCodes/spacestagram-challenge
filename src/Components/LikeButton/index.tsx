import React, {MouseEventHandler} from 'react'
import {ImHeart} from 'react-icons/im'

import {joinClassnames} from '../../Utils/JoinClassnames'

import Button, {ButtonProps} from '../Button'

import styles from './LikeButton.module.scss'

type HeartClass = 'heart-icon--show' | 'heart-icon--hide'

function LikeButton({onClick} : ButtonProps) {
  const [liked, setLiked] = React.useState<boolean|null>(null)

  const heartClass : HeartClass = liked ? 'heart-icon--show' : 'heart-icon--hide'

  const handleClick : MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick && onClick(e)

    setLiked((prevValue) => !prevValue)
  }

  return (
    <Button onClick={handleClick}>
      {
        liked !== null &&
          <ImHeart 
            className={joinClassnames([styles['heart-icon'], styles[heartClass]])}/>
      }

      <span>{liked ? 'Liked' : 'Like'}</span>
    </Button>
  )
}

export default LikeButton
