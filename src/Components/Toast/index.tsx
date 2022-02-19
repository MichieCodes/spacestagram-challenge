import React, {AnimationEventHandler} from 'react'

import {IToastMessage} from '../../Models/IToastMessage'
import {useToastEmitter} from '../../Context/ToastContext'
import {joinClassnames} from '../../Utils/JoinClassnames'

import styles from './Toast.module.scss'

type ToastProps = IToastMessage
type ToastState = 'toast--enter' | 'toast--exit'
 
function Toast({id, title, body} : ToastProps) {
  const toast = React.useRef<HTMLDivElement>(null)
  const [enter, setEnter] = React.useState(true)
  const {deleteToast} = useToastEmitter()

  const toastState : ToastState = enter ? 'toast--enter' : 'toast--exit'
  const toastClasses : string = joinClassnames(
    styles['toast'], styles[toastState]
  )

  React.useEffect(() => {
    const toastElement = toast.current!
    const height = toastElement.scrollHeight

    toastElement.setAttribute('style', `--height: ${height}px`)
  }, [])

  const handleAnimationEnd : AnimationEventHandler = React.useCallback((e) => {
    if(e.animationName !== styles['toast-scale-out']) return

    deleteToast(id)
  }, [id])

  return (
    <div
      ref={toast}
      className={toastClasses}
      onAnimationEnd={handleAnimationEnd}
      onClick={() => setEnter(false)}>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  )
}

export default Toast
