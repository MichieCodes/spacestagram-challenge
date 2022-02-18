import {today} from '../../Utils/GetDate'

import Button from '../Button'

import styles from './DatePicker.module.scss'

const MIN_DATE = '2015-01-01'
const MAX_DATE = today()

function DatePicker() {
  return (
    <div className={styles['date-picker']}>
      <label htmlFor="start-date">Start Date: </label>
      <input
        type="date"
        id="start-date"
        className="input"
        min={MIN_DATE}
        max={MAX_DATE}/>
      <Button onClick={() => console.log('Browsing...')}>
        Browse
      </Button>
    </div>
  )
}

export default DatePicker
