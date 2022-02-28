import React from 'react'

import {IPost} from '../Models/IPost'
import {TupleFromInterface} from '../Utils/TuplesFromInterface'
import {ILikeSet} from '../Models/ILikeSet'
import {fetchLikes, fetchPosts, saveLikes} from '../Services/PostService'
import {useLoader} from '../Hooks/UseLoader'

type LoadAction = {type: 'LOAD_POSTS', payload: IPost[]}
type LoadCustomAction = {type: 'LOAD_CUSTOM_POSTS', payload: string | IPost[]}
type LikeAction = {type: 'LIKE_POST', payload: string}
type StartDateAction = {type: 'SET_START_DATE', payload: string}
type PageAction = {type: 'NEXT_PAGE', payload: undefined}

export type PostState = {posts: IPost[], likes: ILikeSet, startDate: string, page: number}
export type PostAction = LoadAction | LoadCustomAction | LikeAction | StartDateAction | PageAction

type PostDispatchParameters = TupleFromInterface<PostAction, ['type', 'payload']> 

const initialState : PostState = {posts: [], likes: {}, startDate: '', page: 0}

function postReducer(state : PostState, action : PostAction) : PostState {
  switch(action.type) {
    case 'LOAD_POSTS': {
      const likes = fetchLikes()
      return {...state, posts: action.payload, likes, page: 0}
    }
    case 'LOAD_CUSTOM_POSTS': {
      if(typeof action.payload === 'string') break
      return {...state, posts: action.payload, page: 0}
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
    case 'NEXT_PAGE': {
      if(state.posts.length <= 10 * (state.page + 1))
        return state

      return {...state, page: state.page + 1}
    }
    default:
      break
  }

  return state
}


export function usePostReducer() {
  const [posts, dispatch] = React.useReducer(postReducer, initialState)
  const [loading, load] = useLoader()

  const postDispatch = React.useCallback(async (
    ...args : [PostDispatchParameters[0]] | PostDispatchParameters
  ) => {
    let action = {type : args[0], payload : args[1]} as PostAction

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