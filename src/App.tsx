import {PostProvider} from './Context/PostContext'

import Home from './Views/Home'

import './App.scss'

function App() {
  return (
    <div className="app">
      <PostProvider>
        <Home/>
      </PostProvider>
    </div>
  )
}

export default App
