import { useState } from 'react'
import './App.css'

import { Header, LoginForm, NewsLatter, PostForm, SignUpForm, Slider } from "./components/index"

function App() {

  return (
    <>
      <Header />
      <Slider />
      <SignUpForm/>
      {/* <PostForm/> */}
      <NewsLatter/>
    </>
  )
}

export default App
