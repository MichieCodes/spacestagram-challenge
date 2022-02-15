import {ComponentProps} from 'react'

import {joinClassnames} from '../../Utils/JoinClassnames'

import styles from './Button.module.scss'

export type ButtonProps = ComponentProps<"button">

function Button({children, className, onClick} : ButtonProps) {
  return (
    <button
      className={joinClassnames([styles.button, className])}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
