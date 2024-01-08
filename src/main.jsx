import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./store/store"
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {HomePage, AddPostPage, LoginPage, SignUpPage } from './pages/index'
import { PrivateRoutes } from './components/index.js'

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
        element:(
          <PrivateRoutes isLoggedIn={false}>
            <SignUpPage/>
          </PrivateRoutes>
        )
      },
      {
        path:'/login',
        element:(
          <PrivateRoutes isLoggedIn={false}>
            <LoginPage/>
          </PrivateRoutes>
        )
      },
      {
        path:'/createblog',
        element:(
          <PrivateRoutes isLoggedIn={true}>
            <AddPostPage/>
          </PrivateRoutes>
        )
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
