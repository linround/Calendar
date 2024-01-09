import './main.css'
import React from 'react'
import 'antd/dist/reset.css'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { router } from './routes'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(<Provider store={store}>

    <RouterProvider router={router} />
  </Provider>)
