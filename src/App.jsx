import { useState } from 'react'
import './App.css'

import { Header, LoginForm, NewsLatter, PostForm, SignUpForm, Slider } from "./components/index"

function App() {

  return (
    <>
      <Header />
      <Slider />
      <PostForm/>
      <NewsLatter/>
    </>
  )
}

export default App
