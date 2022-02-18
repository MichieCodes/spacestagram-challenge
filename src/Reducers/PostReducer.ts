import React from 'react'

import {IPost} from '../Models/IPost'
import {fetchPosts} from '../Services/PostService'
import {useLoader} from '../Hooks/UseLoader'

export type LoadAction = {type: 'LOAD_POSTS', payload: IPost[]}
export type LoadCustomAction = {type: 'LOAD_CUSTOM_POSTS', payload: string}

type PostState = IPost[]
type PostAction = LoadAction | LoadCustomAction

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
    let action = {type, payload} as T

    switch(action.type) {
      case 'LOAD_POSTS':
        action.payload = await load(fetchPosts())
        break
      case 'LOAD_CUSTOM_POSTS':
        const newAction : LoadAction = {
          type: 'LOAD_POSTS',
          payload: await load(fetchPosts(action.payload))
        }

        dispatch(newAction)
        return 
    }

    dispatch(action)
  }, [])

  return [{posts, loading}, postDispatch] as const
}

export type PostDispatcher = ReturnType<typeof usePostReducer>[1]
