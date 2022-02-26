import React from 'react'

import {useTimeout} from '../../Hooks/UseTimeout'

import Button from '../Button'

import styles from './LoadButton.module.scss'

type LoadState = 'Load More' | 'Loading...'

function LoadButton() {
  const [text, setText] = React.useState<LoadState>('Load More')
  const LoadTimer = useTimeout(
    React.useCallback(() => setText('Load More'), []),
    1200
  )

  const loadMore = () => {
    setText('Loading...')
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
