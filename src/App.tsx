import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {PostProvider} from './Context/PostContext'

import Home from './Views/Home'
import SinglePost from './Views/SinglePost'
import PageNotFound from './Views/PageNotFound'

import './App.scss'

function App() {
  return (
    <div className="app">
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/posts/:postID" element={<SinglePost/>} />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </div>
  )
}

export default App
