import {IoIosRocket} from 'react-icons/io'

import {useEllipsis} from '../../Hooks/UseEllipsis'

import styles from './Loading.module.scss'

function Loading() {
  const loadingText = useEllipsis('Loading', 250)

  return (
    <div className={styles['rocket-loader']}>
      <div>
        <span>
          <IoIosRocket/>
        </span>
        <p>{loadingText}</p>
      </div>
    </div>
  )
}

export default Loading
