import {IoIosRocket} from 'react-icons/io'

import styles from './Loading.module.scss'

function Loading() {
  return (
    <div className={styles['rocket-loader']}>
      <div>
        <span>
          <IoIosRocket/>
        </span>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default Loading
