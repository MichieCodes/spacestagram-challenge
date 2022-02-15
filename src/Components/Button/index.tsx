import {ComponentProps} from 'react'

import styles from './Button.module.scss'

export type ButtonProps = ComponentProps<"button">

function Button({children, onClick} : ButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
