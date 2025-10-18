import React, {useState, useRef } from 'react'

const Record = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0)

    const mediaStream = useRef(null)
    const mediaRecoder = useRef(null)
    
    const startRecording = async() => {
        try {
            setSeconds(0);
            const stream = await navigator.mediaDevices.getUserMedia({audio: true})
            mediaStream.current = stream
        }
        catch(error) {
            console.error(error)
        }
    }
}