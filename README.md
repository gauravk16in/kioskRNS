![Kiosk Live Demo](https://s8.ezgif.com/tmp/ezgif-81c14e28ad717027.gif)





# RNSIT Digital Receptionist (Kiosk)

A fully integrated AI Receptionist for RNS Institute of Technology. The system features a modern React/Vite frontend (glassmorphism UI), a FastAPI Python backend, face recognition via webcam, and local LLM-powered RAG (using Ollama) for answering campus-related questions.

## Features
- **Modern Kiosk UI**: Sleek glassmorphism UI with dynamic screens (Idle, Entry, Check-in, Ask Question, Directions).
- **Face Recognition**: Detects faces, registers new visitors, and recognizes returning visitors automatically.
- **Local AI Engine**: Powered by `llama3.1:latest` and `nomic-embed-text` running locally via Ollama.
- **RAG Knowledge Base**: Uses `data/college_info.json` to accurately answer FAQs, navigation, and staff details without hallucinations.

---

## Folder Structure
```text
frontdesk-ai-design/
├── backend/
│   ├── main.py          ← FastAPI server (WebSockets, Face DB, Sessions)
│   ├── detection.py     ← Camera engine (Face detection + MediaPipe/DeepFace)
│   ├── llm.py           ← Local AI RAG implementation (Ollama)
│   └── database.py      ← Postgres/SQLite connection for face storage
├── data/
│   └── college_info.json ← Knowledge base for the RAG LLM
├── src/                 ← React (Vite, TypeScript, Tailwind)
│   ├── screens/         ← Idle, Entry, CheckIn, AskQuestion, Directions
│   └── components/      ← SiriOrb, TopBar, etc.
├── requirements.txt     ← Python backend dependencies
└── package.json         ← Node.js frontend dependencies
```

---


## Prerequisites
1. **Node.js** (v18+)
2. **Python** (3.9 - 3.11 recommended)
3. **Ollama** (Running locally on port 11434)
   - Ensure you have pulled the required models:
     ```bash
     ollama pull llama3.1:latest
     ollama pull nomic-embed-text
     ```

---

## Step 1 — Start the AI Engine (Ollama)
Ensure the Ollama application is open and running in the background. The backend relies on it for generating responses and embedding text.

---

## Step 2 — Start the Python Backend
Open a terminal at the project root (`frontdesk-ai-design/`):

```bash
# 1. Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the FastAPI server
python3 -m uvicorn backend.main:app
```
*The API will run on `http://localhost:8000`.*

---

## Step 3 — Start the React Frontend
Open a **new terminal tab** at the project root (`frontdesk-ai-design/`):

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite dev server
npm run dev
```
*The UI will run on `http://localhost:5173`.*

---

## Step 4 — Start the Camera / Face Detection
Open a **new terminal tab** at the project root (`frontdesk-ai-design/`):

```bash
source .venv/bin/activate
python3 backend/detection.py
```
*This script captures the webcam feed, processes faces, and communicates with the FastAPI backend.*

---

## Customization
- **Knowledge Base**: Edit `data/college_info.json` to update college FAQs, placement stats, and staff details. Restart the python backend after making changes.
- **System Prompt**: Edit `backend/llm.py` to adjust the AI's personality, strictness, or tone.
- **Branding**: Update `public/campus-map.png` and `public/cafeteria-map.png` for map visual assets.
