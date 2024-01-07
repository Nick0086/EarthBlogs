import { useState } from 'react'
import './App.css'

import { Header, LoginForm, NewsLatter, SignUpForm, Slider } from "./components/index"

function App() {

  return (
    <>
      <Header />
      <Slider />
      <NewsLatter/>
    </>
  )
}

export default App
