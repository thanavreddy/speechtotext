'use client'

import { useState, useRef } from 'react';

export default function Recorder() {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (isRecording) return;
    setTranscript('');
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      setIsLoading(true);
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');

      try {
        const res = await fetch('/api/route', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        setTranscript(data.transcript || 'No transcription found');
      } catch (err) {
        setTranscript('Transcription failed.');
      } finally {
        setIsLoading(false);
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
      }
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center gap-8 mb-8">
          <button
            onClick={startRecording}
            disabled={isRecording || isLoading}
            className={`
              relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300
              ${isRecording ? 'bg-gradient-to-br from-purple-700 to-pink-700 animate-pulse' : 'bg-gradient-to-br from-gray-800 to-gray-700 hover:scale-105 hover:shadow-2xl'}
              ${isRecording || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              group
            `}
            aria-label="Start Recording"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-gray-200 font-semibold tracking-wide opacity-80 pointer-events-none select-none">
              Start
            </span>
            {isRecording ? (
              <span className="block w-8 h-8 bg-gray-200 rounded transition-all duration-300"></span>
            ) : (
              <svg className="w-10 h-10 text-gray-200 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
            )}
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording || isLoading}
            className={`
              relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300
              ${!isRecording ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-pink-700 to-red-700 hover:scale-105 hover:shadow-2xl'}
              ${!isRecording || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              group
            `}
            aria-label="Stop Recording"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-gray-200 font-semibold tracking-wide opacity-80 pointer-events-none select-none">
              Stop
            </span>
            <svg className="w-10 h-10 text-gray-200 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <rect x="7" y="7" width="10" height="10" rx="2" />
            </svg>
          </button>
        </div>
        <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 min-h-[100px] shadow-inner border border-gray-700 transition-all duration-300">
          {isLoading ? (
            <div className="flex items-center justify-center text-purple-400 font-medium animate-pulse">
              <svg className="animate-spin h-6 w-6 mr-3 text-purple-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Transcribing...
            </div>
          ) : transcript ? (
            <div className="text-gray-100 text-lg font-medium animate-fade-in">
              {transcript}
            </div>
          ) : (
            <div className="text-gray-500 text-base text-center animate-fade-in">
              Your transcript will appear here.
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1);
        }
        body {
          background: linear-gradient(135deg, #181926 0%, #232336 100%);
          color: #e5e7eb;
        }
      `}</style>
      </div>
  );
}