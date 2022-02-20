import React from 'react'

import {IPost} from '../../Models/IPost'
import {useToastEmitter} from '../../Context/ToastContext'
import {useTimeout} from '../../Hooks/UseTimeout'

import Button from '../Button'

interface ShareButtonProps {
  post: IPost
}

type ShareState = 'Share' | 'Shared'

function ShareButton({post} : ShareButtonProps) {
  const [text, setText] = React.useState<ShareState>('Share')
  const {emitToast} = useToastEmitter()
  const ShareTimer = useTimeout(
    React.useCallback(() => setText('Share'), []),
    1200
  )

  const share = () => {
    setText('Shared')

    ShareTimer.start()
    emitToast({
      title: 'Successfully Shared Post',
      body: `Copied Link to ${post.title} - ${post.date}`,
      duration: 2500
    })
  }

  return (
    <Button onClick={share}>{text}</Button>
  )
}

export default ShareButton
