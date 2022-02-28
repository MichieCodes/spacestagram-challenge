import React from 'react'

export type TimerState = 'running' | 'paused' | 'stopped'

const _timePassed = (date : number) => new Date().getTime() - date

export function useTimeout(cb : Function, delay : number, autoStart : boolean = false) {
  const timeout = React.useRef(-1)
  const time = React.useRef(new Date().getTime())
  const remaining = React.useRef(delay)
  const [state, setState] = React.useState<TimerState>('stopped')

  const _createTimeout = React.useCallback((_delay : number = delay) => {
    clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {cancel(); cb()}, _delay)
    time.current = new Date().getTime()
    remaining.current = _delay
  }, [cb, delay])

  const resume = React.useCallback(() => {
    if(remaining.current <= 0) {
      cancel()
      return
    }

    clearTimeout(timeout.current)
    _createTimeout(remaining.current)
    setState('running')
  }, [])

  const pause = React.useCallback(() => {
    remaining.current -= _timePassed(time.current) 

    if(remaining.current <= 0) {
      cancel()
      return
    }

    clearTimeout(timeout.current)
    setState('paused')
  }, [])

  const cancel = React.useCallback(() => {
    clearTimeout(timeout.current)
    setState('stopped')
  }, [])

  const start = React.useCallback(() => {
    _createTimeout()
    setState('running')
  }, [_createTimeout])

  React.useEffect(() => {
    if(!autoStart) return

    start()
    return cancel
  }, [autoStart, start, cancel])

  return {start, pause, resume, cancel, state}
}
