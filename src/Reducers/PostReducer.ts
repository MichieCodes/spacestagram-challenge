import React from 'react'

import {IPost} from '../Models/IPost'
import {TupleFromInterface, ActionParameters} from '../Utils/TuplesFromInterface'
import {ILikeSet} from '../Models/ILikeSet'
import {fetchLikes, fetchNextPosts, saveLikes} from '../Services/PostService'
import {useLoader} from '../Hooks/UseLoader'
import {daysSince, relativeDate, startOfMonth} from '~/Utils/GetDate'

type LoadAction = {type: 'LOAD_POSTS', payload?: IPost[]}
type LoadCustomAction = {
  type: 'LOAD_CUSTOM_POSTS',
  payload: string | {posts: IPost[], append?: boolean}
}
type LikeAction = {type: 'LIKE_POST', payload: string}
type StartDateAction = {type: 'SET_START_DATE', payload: string}
type PageAction = {
  type: 'NEXT_PAGE',
  payload: {date: string, count: number, order: 'asc' | 'desc'}
}

export type PostState = {posts: IPost[], likes: ILikeSet, startDate: string, totalPosts: number}
export type PostAction = LoadAction | LoadCustomAction | LikeAction | StartDateAction | PageAction

type PostDispatchParameters = ActionParameters<TupleFromInterface<PostAction, ['type', 'payload']>>

const initialState : PostState = {
  posts: [],
  likes: {},
  startDate: '',
  totalPosts: daysSince(startOfMonth()) + 1
}

function postReducer(state : PostState, action : PostAction) : PostState {
  switch(action.type) {
    case 'LOAD_POSTS': {
      if(!action.payload) break

      const likes = fetchLikes()
      return {
        ...state,
        posts: action.payload,
        likes,
        totalPosts: daysSince('2015-01-01')
      }
    }
    case 'LOAD_CUSTOM_POSTS': {
      if(typeof action.payload === 'string') break

      let {posts, append} = action.payload

      if(append) {
        posts = [
          ...state.posts,
          ...posts
        ]
      }
      
      return {...state, posts}
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
      return {
        ...state,
        startDate: action.payload,
        totalPosts: daysSince(action.payload) + 1
      }
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
    ...args : PostDispatchParameters
  ) => {
    let action = {type : args[0], payload : args[1]} as PostAction

    switch(action.type) {
      case 'LOAD_POSTS':
        action.payload = await load(fetchNextPosts())
        break
      case 'LOAD_CUSTOM_POSTS':
        if(typeof action.payload !== 'string') break

        dispatch({type: 'SET_START_DATE', payload: action.payload})
        action.payload = {
          posts: await load(fetchNextPosts(action.payload, 10, 'asc')),
          append: false
        }
        break
      case 'NEXT_PAGE':
        const {date, count, order} = action.payload

        const loadAction : LoadCustomAction = {
          type: 'LOAD_CUSTOM_POSTS',
          payload: {
            posts: await fetchNextPosts(
              relativeDate(date, 2 * (order === 'asc' ? 1 : -1)),
              count,
              order
            ),
            append: true
          }
        }

        dispatch(loadAction)
        break
    }

    dispatch(action)
  }, [])

  return [{...posts, loading}, postDispatch] as const
}

export type PostDispatcher = ReturnType<typeof usePostReducer>[1]
