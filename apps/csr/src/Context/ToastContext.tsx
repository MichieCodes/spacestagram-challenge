import React from 'react'
import {nanoid} from 'nanoid'

import {IToastMessage} from '~/Models/IToastMessage'

import ToastList from '~/Components/ToastList'

type ToastDataType = IToastMessage[]
type ToastFunctionType = {
  emitToast : (message : Omit<IToastMessage, 'id'>) => void,
  deleteToast : (id : string) => void
}

interface ToastProviderProps {
  children: React.ReactNode
}

const ToastDataContext = React.createContext<ToastDataType>([])
const ToastFunctionContext = React.createContext<ToastFunctionType>({
  emitToast: () => 0,
  deleteToast: () => 0
})

export function ToastProvider({children} : ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastDataType>([])

  const emitToast : ToastFunctionType['emitToast'] = React.useCallback((message) => {
    setToasts((prevToasts) => 
      [{...message, id: nanoid()}, ...prevToasts]
    ) 
  }, [])

  const deleteToast : ToastFunctionType['deleteToast'] = React.useCallback((id) => {
    setToasts((prevToasts) => 
      prevToasts.filter((toast) => toast.id !== id)
    ) 
  }, [])

  return (
    <ToastFunctionContext.Provider value={{emitToast, deleteToast}}>
      {children}
      <ToastDataContext.Provider value={toasts}>
        {!!toasts.length && <ToastList/>}
      </ToastDataContext.Provider> 
    </ToastFunctionContext.Provider>
  )
}

export function useToasts() {
  return React.useContext(ToastDataContext)!
}

export function useToastEmitter() {
  return React.useContext(ToastFunctionContext)!
}
