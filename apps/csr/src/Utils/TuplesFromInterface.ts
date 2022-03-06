type Lookup<T, K> = K extends keyof T ? T[K] : never

export type TupleFromInterface<T, K extends Array<keyof T>> =
  T extends never ?
    never
    : {[I in keyof K]: Lookup<T, K[I]>}

export type ActionParameters<T extends [T[0], T[1]]> =
  T extends never ?
    never
    : undefined extends T[1] ? 
      [type: T[0], payload?: T[1]]
      : [type: T[0], payload: T[1]]
