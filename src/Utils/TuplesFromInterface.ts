type Lookup<T, K> = K extends keyof T ? T[K] : never

export type TupleFromInterface<T, K extends Array<keyof T>> =
  T extends never ?
    never
    : {[I in keyof K]: Lookup<T, K[I]>}
