import React from 'react'

export function useLoader() {
  const [loading, setLoading] = React.useState(false)

  const load = React.useCallback(async (promise : Promise<any>) => {
    setLoading(true)
    return promise.finally(() => {
      setLoading(false)
    })
  }, [])

  return [loading, load] as const
}
