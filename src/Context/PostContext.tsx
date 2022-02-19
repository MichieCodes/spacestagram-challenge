import React from 'react'

import {IPost} from '../Models/IPost'
import {PostDispatcher, usePostReducer} from '../Reducers/PostReducer'

type PostDataType = {posts: IPost[], loading: boolean}
type PostFunctionType = PostDispatcher

interface PostProviderProps {
  children: React.ReactNode
}

const PostDataContext = React.createContext<PostDataType|null>(null)
const PostFunctionContext = React.createContext<PostFunctionType|null>(null)

export function PostProvider({children} : PostProviderProps) {
  const [postState, postDispatch] = usePostReducer()

  return (
    <PostFunctionContext.Provider value={postDispatch}>
      <PostDataContext.Provider value={postState}>
        {children}
      </PostDataContext.Provider> 
    </PostFunctionContext.Provider>
  )
}

export function usePosts() {
  return React.useContext(PostDataContext)!
}

export function usePostDispatcher() {
  return React.useContext(PostFunctionContext)!
}
