import React from 'react'

import {IPost} from '../Models/IPost'
import {ILikeSet} from '../Models/ILikeSet'
import {fetchLikes, fetchPosts, likePost} from '../Services/PostService'
import {useLoader} from '../Hooks/UseLoader'

export type LoadAction = {type: 'LOAD_POSTS', payload: IPost[]}
export type LoadCustomAction = {type: 'LOAD_CUSTOM_POSTS', payload: string | IPost[]}
export type LikeAction = {type: 'LIKE_POST', payload: string}

type PostState = {posts: IPost[], likes: ILikeSet}
type PostAction = LoadAction | LoadCustomAction | LikeAction

const initialState : PostState = {posts: [], likes: {}}

function postReducer(state : PostState, action : PostAction) : PostState {
  switch(action.type) {
    case 'LOAD_POSTS': {
      const likes = fetchLikes()
      return {posts: action.payload, likes}
    }
    case 'LOAD_CUSTOM_POSTS': {
      if(typeof action.payload === 'string') break
      return {...state, posts: action.payload}
    }
    case 'LIKE_POST': {
      const likes = likePost(state.likes, action.payload)
      return {...state, likes}
    }
    default:
      break
  }

  return state
}

export function usePostReducer() {
  const [posts, dispatch] = React.useReducer(postReducer, initialState)
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
        if(typeof action.payload !== 'string') break

        action.payload = await load(fetchPosts(action.payload))
        break 
    }

    dispatch(action)
  }, [])

  return [{...posts, loading}, postDispatch] as const
}

export type PostDispatcher = ReturnType<typeof usePostReducer>[1]
