import React from 'react'

import {IPost} from '../Models/IPost'
import {ILikeSet} from '../Models/ILikeSet'
import {fetchLikes, fetchPosts, saveLikes} from '../Services/PostService'
import {useLoader} from '../Hooks/UseLoader'

export type LoadAction = {type: 'LOAD_POSTS', payload: IPost[]}
export type LoadCustomAction = {type: 'LOAD_CUSTOM_POSTS', payload: string | IPost[]}
export type LikeAction = {type: 'LIKE_POST', payload: string}
export type StartDateAction = {type: 'SET_START_DATE', payload: string}

export type PostState = {posts: IPost[], likes: ILikeSet, startDate: string}
export type PostAction = LoadAction | LoadCustomAction | LikeAction | StartDateAction

const initialState : PostState = {posts: [], likes: {}, startDate: ''}

function postReducer(state : PostState, action : PostAction) : PostState {
  switch(action.type) {
    case 'LOAD_POSTS': {
      const likes = fetchLikes()
      return {...state, posts: action.payload, likes}
    }
    case 'LOAD_CUSTOM_POSTS': {
      if(typeof action.payload === 'string') break
      return {...state, posts: action.payload}
    }
    case 'LIKE_POST': {
      const postID = action.payload
      const likes = {
        ...state.likes,
        [postID]: !state.likes[postID]
      }

      saveLikes(likes)
      return {...state, likes}
    }
    case 'SET_START_DATE': {
      return {...state, startDate: action.payload}
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

        dispatch({type: 'SET_START_DATE', payload: action.payload})
        action.payload = await load(fetchPosts(action.payload, 'asc'))
        break 
    }

    dispatch(action)
  }, [])

  return [{...posts, loading}, postDispatch] as const
}

export type PostDispatcher = ReturnType<typeof usePostReducer>[1]
