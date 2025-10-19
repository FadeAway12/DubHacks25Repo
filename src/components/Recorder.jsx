import React, { useState, useRef } from 'react';
import { startTranscription }  from '../api/Transcribe.jsx'

export const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recordedURL, setRecordedURL] = useState('');

  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);

  const [transcription, setTranscription] = useState("")

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setSeconds(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedURL(url);

        chunks.current = [];
        clearInterval(timerRef.current);
      };

      mediaRecorder.current.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      mediaStream.current?.getTracks().forEach((track) => track.stop());
    }
  
    // Wait for recordedURL to be ready
    setTimeout(async () => {
      const blob = await fetch(recordedURL).then((r) => r.blob());
      const formData = new FormData();
      formData.append("file", blob, "audio.mp3");
  
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      setTranscription(data.text);
    }, 1000);
  };
  

  const getRecordedURL = () => {
    return recordedURL;
  }

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 gap-4'>
      <h1 className='text-white text-[60px] font-black'>Recorder</h1>

      <h2 className='text-[100px] text-white bg-black p-4 rounded-lg mx-4'>
        {formatTime(seconds)}
      </h2>

      {isRecording ? (
        <button
          onClick={stopRecording}
          className='flex items-center justify-center text-[60px] bg-red-500 rounded-full p-4 text-white w-[100px] h-[100px]'
        >
          ⏹️
        </button>
      ) : (
        <button
          onClick={startRecording}
          className='flex items-center justify-center text-[60px] bg-blue-500 rounded-full p-4 text-white w-[100px] h-[100px]'
        >
          🎙️
        </button>
      )}
    <br></br>
      {recordedURL && <audio controls src={recordedURL} />}
    <p>{transcription}</p>
    </div>
  );

};
