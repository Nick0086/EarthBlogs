import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./store/store"
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {HomePage, AddPostPage, LoginPage, SignUpPage } from './pages/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path:'/',
        element:<HomePage/>,
      },
      {
        path:'/signup',
        element:<SignUpPage/>
      },
      {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/createblog',
        element:<AddPostPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
