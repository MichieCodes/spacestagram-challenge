import React from 'react'

export function useEllipsis(text : string, delay : number) {
  const interval = React.useRef<number|undefined>()
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    interval.current = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % 4)
    }, delay) 

    return () => clearInterval(interval.current) 
  }, [text, delay])

  return text + '.'.repeat(count)
}
