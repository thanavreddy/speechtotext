'use client'

import React from 'react'
import Recorder from './components/Recorder'

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#181926] to-[#232336]">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-700">
        <h1 className="text-3xl font-extrabold text-purple-300 mb-2 text-center drop-shadow">Speech to Text Converter</h1>
        <p className="text-gray-400 mb-6 text-center">
          Record your voice and get an instant transcript.<br />
          Click <span className="font-semibold text-blue-400">Start</span> to begin, then <span className="font-semibold text-pink-400">Stop</span> when you're done.
        </p>
        <Recorder />
      </div>
      <footer className="mt-8 text-gray-600 text-sm text-center">
        &copy; {new Date().getFullYear()} <span className="text-purple-400 font-semibold">HackWeek Speech-to-Text</span>
      </footer>
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #181926 0%, #232336 100%);
          color: #e5e7eb;
        }
      `}</style>
    </main>
  )
}

export default page
