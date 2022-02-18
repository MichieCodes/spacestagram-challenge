import React from 'react'

import {startOfMonth, today} from '../../Utils/GetDate'

import Button from '../Button'

import styles from './DatePicker.module.scss'

const MIN_DATE = '2015-01-01'
const MAX_DATE = today()
const INIT_DATE = startOfMonth()

function DatePicker() {
  const [date, setDate] = React.useState(INIT_DATE)

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

      <Button onClick={() => {
        console.log('Browsing...', date)
      }}>
        Browse
      </Button>
    </div>
  )
}

export default DatePicker
