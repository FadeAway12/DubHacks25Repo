import { useState } from 'react'
import './App.css'
import { Record } from "../components/Recorder.jsx"

function App() {

  const [myState, setMyState] = useState("Welcome to our react app, blud");


  function recordOn() {
    setMyState(prev => prev + " hi "); 
  }

  return (
    <>
      <h1>{myState}</h1>
      <Record></Record>
    </>
  )
}

export default App
