import React from 'react'

import {PageAction} from '../../Reducers/PostReducer'
import {usePostDispatcher} from '../../Context/PostContext'
import {useTimeout} from '../../Hooks/UseTimeout'

import Button from '../Button'

import styles from './LoadButton.module.scss'

type LoadState = 'Load More' | 'Loading...'

function LoadButton() {
  const [text, setText] = React.useState<LoadState>('Load More')
  const postDispatch = usePostDispatcher()
  const LoadTimer = useTimeout(
    React.useCallback(() => setText('Load More'), []),
    1200
  )

  const loadMore = () => {
    setText('Loading...')
    postDispatch<PageAction>('NEXT_PAGE')
    LoadTimer.start()
  }

  return (
    <Button
      className={styles['load-button']}
      onClick={loadMore}>
      {text}
    </Button>
  )
}

export default LoadButton
