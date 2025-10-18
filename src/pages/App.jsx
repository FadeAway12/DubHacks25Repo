import { useState } from 'react'
import './App.css'

function App() {
  const [toUse, setToUse] = useState("Welcome to our React app, blud");

  const recordOn = () => {
    setToUse(toUse + " hi");
  };

  return (
    <>
      <h1>{toUse}</h1>
      <button onClick={recordOn}>Record</button>
    </>
  );
}

export default App;
