import { useState } from 'react'
import './App.css'

function App() {
  const [toUse, setToUse] = useState("Welcome to our React app, blud");

  const recordOn = () => {
    setToUse(toUse + " hi");
  };

  return (
    <>
<<<<<<< HEAD
      <h1>Click the record button below to start recording</h1>
      <button>Record</button>
=======
      <h1>{toUse}</h1>
      <button onClick={recordOn}>Record</button>
>>>>>>> e356d0d4a3e1761ace2e1570333ca49403137c43
    </>
  );
}

export default App;
