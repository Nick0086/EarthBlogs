import { useState } from 'react'
import './App.css'

import { Footer, Header, LoginForm, NewsLatter, PostForm, SignUpForm, Slider } from "./components/index"
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
