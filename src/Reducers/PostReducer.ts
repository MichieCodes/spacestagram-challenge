import React from 'react'

import {IPost} from '../Models/IPost'

export type LoadAction = {type: 'LOAD_POSTS', payload: IPost[]}

type PostState = IPost[]
type PostAction = LoadAction

function postReducer(state : PostState, action : PostAction) : PostState {
  switch(action.type) {
    case 'LOAD_POSTS':
      return action.payload
    default:
      return state
  }
}

export function usePostReducer() {
  const [posts, dispatch] = React.useReducer(postReducer, [])

  const postDispatch = React.useCallback(<T extends PostAction> (
    type : T['type'],
    payload : T['payload']
  ) => {
    dispatch({type, payload} as T)
  }, [])

  return [posts, postDispatch] as const
}
