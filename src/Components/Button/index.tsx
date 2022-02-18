import {ComponentProps} from 'react'

import {joinClassnames} from '../../Utils/JoinClassnames'

export type ButtonProps = ComponentProps<"button">

function Button({children, className, onClick} : ButtonProps) {
  return (
    <button
      className={joinClassnames(['button', className])}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
