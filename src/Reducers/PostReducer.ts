import React from 'react'

import {IPost} from '../Models/IPost'
import {fetchPosts} from '../Services/PostService'
import {useLoader} from '../Hooks/UseLoader'

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
  const [loading, load] = useLoader()

  const postDispatch = React.useCallback(async <T extends PostAction> (
    type : T['type'],
    payload ?: T['payload']
  ) => {
    switch(type) {
      case 'LOAD_POSTS':
        payload = await load(fetchPosts())
        break
    }

    dispatch({type, payload} as T)
  }, [])

  return [{posts, loading}, postDispatch] as const
}
