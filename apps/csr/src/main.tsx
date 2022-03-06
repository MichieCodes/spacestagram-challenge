import React from 'react'
import ReactDOM from 'react-dom'

import {ToastProvider} from './Context/ToastContext'

import App from './App'

import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <App/>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
