import Button from '../Button'

import styles from './DatePicker.module.scss'

const MIN_DATE = '2015-01-01'

function DatePicker() {
  return (
    <div className={styles['date-picker']}>
      <label htmlFor="start-date">Start Date: </label>
      <input
        type="date"
        id="start-date"
        className="input"
        min={MIN_DATE}/>
      <Button onClick={() => console.log('Browsing...')}>
        Browse
      </Button>
    </div>
  )
}

export default DatePicker
