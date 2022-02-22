import React from 'react'

import {IPost} from '../Models/IPost'
import {ILikeSet} from '../Models/ILikeSet'
import {LoadAction, PostDispatcher, usePostReducer} from '../Reducers/PostReducer'

type PostFunctionType = PostDispatcher
type PostDataType = {
  posts: IPost[],
  likes: ILikeSet,
  loading: boolean
}

interface PostProviderProps {
  children: React.ReactNode
}

const PostFunctionContext = React.createContext<PostFunctionType|null>(null)
const PostDataContext = React.createContext<PostDataType|null>(null)

export function PostProvider({children} : PostProviderProps) {
  const [postState, postDispatch] = usePostReducer()

  const loadPosts = React.useCallback(async () => {
    postDispatch<LoadAction>('LOAD_POSTS')
  }, [])

  React.useEffect(() => {
    loadPosts() 
  }, [])

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
