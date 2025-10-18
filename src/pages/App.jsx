import { useState } from 'react'
import reactLogo from '.././assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Click the record button below to start recording</h1>
      <button>Record</button>
    </>
  )
}

export default App
