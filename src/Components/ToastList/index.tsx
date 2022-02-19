import {useToasts} from '../../Context/ToastContext'

import Toast from '../Toast'

import styles from './ToastList.module.scss'

function ToastList() {
  const toasts = useToasts()

  return (
    <aside className={styles['toast-list']}>
      {
        toasts.map((toast) => 
          <Toast key={toast.id} {...toast}/>
        )
      }
    </aside>
  )
}

export default ToastList
