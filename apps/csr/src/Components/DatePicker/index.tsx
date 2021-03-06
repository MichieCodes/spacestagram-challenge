import React from 'react'

import {today} from '~/Utils/GetDate'
import {usePostDispatcher, usePosts} from '~/Context/PostContext'

import Button from '../Button'

import styles from './DatePicker.module.scss'

const MIN_DATE = '2015-01-01'
const MAX_DATE = today()

function DatePicker() {
  const {startDate} = usePosts()
  const postDispatch = usePostDispatcher()
  const [date, setDate] = React.useState(startDate || '')

  const handleClick = React.useCallback(() => {
    postDispatch('LOAD_CUSTOM_POSTS', date)
  }, [date, postDispatch])

  return (
    <div className={styles['date-picker']}>
      <label htmlFor="start-date">Start Date: </label>

      <input
        type="date"
        id="start-date"
        className="input"
        min={MIN_DATE}
        max={MAX_DATE}
        value={date}
        onChange={(e) => setDate(e.target.value)}/>

      <Button onClick={handleClick}>
        Browse
      </Button>
    </div>
  )
}

export default DatePicker
