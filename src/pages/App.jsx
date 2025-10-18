import { useState } from 'react'
import './App.css'
import AudioRecorder from './AudioRecorder';

function App() {
  const [audio, setAudio] = useState(null);

  return (
    <>
      <h1>Click the record button below to start recording</h1>
      <AudioRecorder setAudioCallback={setAudio}/>
    </>
  );
}

export default App;
