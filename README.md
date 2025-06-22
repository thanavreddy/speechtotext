# Speech-to-Text App using Deepgram API
<div class"center">
<img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=61DAFB" alt="next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
</div>
A simple web app built with Next.js that lets you record your voice and transcribe it into text using the Deepgram Speech-to-Text API.

---

## Features

- Record audio directly from your browser
- Uploads audio to the server
- Sends audio to Deepgram API
- Returns and displays the transcript

---

##  Tech Stack

- **Next.js** (React Framework)
- **Deepgram API** for transcription
- **Formidable** for file parsing in API routes
- **MediaRecorder API** for client-side audio recording

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/thanavreddy/speechtotext.git
cd speechtotext
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Deepgram API Key

Create a `.env.local` file in the root:

```env
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

Get your API key from https://console.deepgram.com/

### 4. Run the App

```bash
npm run dev
```

Visit http://localhost:3000 to start recording and get your speech transcribed!

