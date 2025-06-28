# 🧠 Don'tTrustMe Chatbot

> A full-stack AI Chatbot — built with React + Vite on the frontend and Bun + TypeScript on the backend.

---

## 🚀 Overview

**Don'tTrustMe** is a modern chatbot application that allows users to interact with AI in a sleek and fast interface. It forwards user queries to the Gemini API and displays intelligent, real-time responses.

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ **React** (with TypeScript)
- ⚡ **Vite** – blazing fast bundler
- 🎨 CSS for styling

### Backend:
- 🦊 **Bun** – all-in-one JavaScript runtime (fast alternative to Node.js)
- 🧩 **TypeScript**
- 🌐 Gemini API integration

---

## 📁 Project Structure

<pre><code>``` Don-tTrustMe-Chatbott/ ├── backend/ │ └── backend/ │ ├── src/ │ │ ├── index.ts # Entry point │ │ ├── routes/ │ │ │ └── search.ts # API route │ │ └── utils/ # Gemini handling logic │ ├── key.json # API key │ ├── package.json │ └── tsconfig.json ├── frontend/ │ ├── src/ │ │ ├── App.tsx # Main app │ │ ├── navBar.tsx # Navbar component │ │ └── searchBar.tsx # Chat interface │ ├── vite.config.ts │ └── index.html ``` </code></pre>


---

## 🔑 Setup Instructions
-------------------------------------------
### Backend:
-------------------------------------------
1. Install [Bun](https://bun.sh/docs/installation)
2. Navigate to backend folder:
   ```bash
   cd backend/backend

#Add your Gemini API credentials in key.json:
{
  "key": "YOUR_GEMINI_API_KEY"
}


#Install dependencies and start the server:
  bun install
  bun run dev

--------------------------------------------
###Frontend:
--------------------------------------------
#Navigate to the frontend folder:
  -cd frontend

Install dependencies:
  -npm install

#Start the development server:
  -npm run dev
  
-------------------------------------------
✨ Features

  -Interactive chatbot interface

  -Powered by Google Gemini AI

  -Fully typed codebase (TypeScript)

  -Fast dev experience (Vite + Bun)

  -Modular and scalable

-------------------------------------------  

⚠️ Disclaimer
The name "Don'tTrustMe" is a fun reminder: AI responses should be used wisely — don't always trust the bot blindly!!

======================================================================================

