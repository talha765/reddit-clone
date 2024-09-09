import { useState } from 'react'
import './App.css'
import logo from "./assets/reddit_logo.png"
function App() {

  return (
   <div >
    <header className="flex bg-reddit_dark">
     <img src={logo} className='w-8 h-8 ml-3 mt-3 mb-3 bg-reddit_dark '/>
    </header>
   </div>
  )
}

export default App
