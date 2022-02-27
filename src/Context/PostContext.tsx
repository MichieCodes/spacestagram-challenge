import React from 'react'

import {PostDispatcher, PostState, usePostReducer} from '../Reducers/PostReducer'

type PostFunctionType = PostDispatcher
type PostDataType = PostState & {
  loading: boolean
}

interface PostProviderProps {
  children: React.ReactNode
}

const PostFunctionContext = React.createContext<PostFunctionType|null>(null)
const PostDataContext = React.createContext<PostDataType|null>(null)

export function PostProvider({children} : PostProviderProps) {
  const [postState, postDispatch] = usePostReducer()

  React.useEffect(() => {
    postDispatch('LOAD_POSTS')
  }, [postDispatch])

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
