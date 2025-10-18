import React, { useState, useRef } from "react";

export default function AudioRecorder({setAudioCallback}) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleToggleRecording = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log("Audio recording stopped. Blob URL:", audioUrl);

          // Optional: play or save the recording
          const audio = new Audio(audioUrl);
          audio.play();
          setAudioCallback(audio);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      // Stop recording
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={handleToggleRecording}
      className={`px-4 py-2 rounded text-white font-semibold ${
        isRecording ? "bg-red-600" : "bg-green-600"
      }`}
    >
      {isRecording ? "Stop Recording" : "Start Recording"}
    </button>
  );
}
