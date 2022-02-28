import React from 'react'

import {IPost} from '~/Models/IPost'
import {getBasename} from '~/Utils/GetBasename'
import {useToastEmitter} from '~/Context/ToastContext'
import {useTimeout} from '~/Hooks/UseTimeout'
import {copyToClipboard} from '~/Utils/CopyToClipboard'

import Button from '../Button'

interface ShareButtonProps {
  post: IPost
}

type ShareState = 'Share' | 'Copied'

const _getPostUrl = (id : string) => `${location.origin}/${getBasename()}/posts/${id}`

function ShareButton({post} : ShareButtonProps) {
  const [text, setText] = React.useState<ShareState>('Share')
  const {emitToast} = useToastEmitter()
  const ShareTimer = useTimeout(
    React.useCallback(() => setText('Share'), []),
    1200
  )

  const share = () => {
    copyToClipboard(_getPostUrl(post.date))
    setText('Copied')

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
