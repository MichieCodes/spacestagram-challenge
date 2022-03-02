import React from 'react'

import {usePostDispatcher, usePosts} from '~/Context/PostContext'
import {useTimeout} from '~/Hooks/UseTimeout'
import {daysSince} from '~/Utils/GetDate'

import Button from '../Button'

import styles from './LoadButton.module.scss'

type LoadState = 'Load More' | 'Loading...'

function LoadButton() {
  const [text, setText] = React.useState<LoadState>('Load More')
  const {posts, startDate} = usePosts() || {}
  const postDispatch = usePostDispatcher()
  const LoadTimer = useTimeout(
    React.useCallback(() => setText('Load More'), []),
    1200
  )
  const pagePayload = React.useMemo(() => {
    const date = posts?.slice(-1)[0]?.date

    return {
      date,
      count: Math.min(daysSince(date), 10),
      order: !!startDate ? 'asc' : 'desc' as ('asc' | 'desc')
    }
  }, [posts, startDate])

  const loadMore = () => {
    setText('Loading...')
    postDispatch('NEXT_PAGE', pagePayload)
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
