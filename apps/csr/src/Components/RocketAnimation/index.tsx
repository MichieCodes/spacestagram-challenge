import {IoIosRocket} from 'react-icons/io'

import styles from './RocketAnimation.module.scss'

interface RocketAnimationProps {
  text: string
} 

function RocketAnimation({text} : RocketAnimationProps) {
  return (
    <div className={styles['rocket-loader']}>
      <div>
        <span>
          <IoIosRocket/>
        </span>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default RocketAnimation
