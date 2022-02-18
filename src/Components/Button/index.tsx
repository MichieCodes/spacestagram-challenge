import {ComponentProps} from 'react'

import {joinClassnames} from '../../Utils/JoinClassnames'

export type ButtonProps = ComponentProps<"button">

function Button({children, className, ...props} : ButtonProps) {
  return (
    <button
      className={joinClassnames(['button', className])}
      {...props}>
      {children}
    </button>
  )
}

export default Button
