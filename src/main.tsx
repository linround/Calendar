import './main.css'
import App from './App'
import React from 'react'
import 'antd/dist/reset.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(<BrowserRouter>
    <App />
  </BrowserRouter>)
