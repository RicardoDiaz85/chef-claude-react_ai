# 👨‍🍳 Chef Claude – AI-Powered Recipe Generator

Chef Claude is a React-based web app that turns your fridge leftovers into fun and flavorful recipes using AI. Just list your ingredients, and Chef Claude will generate a complete recipe formatted in clean Markdown — from title to instructions.

---

## 🚀 Features

- ✅ Generate recipes with **AI** using just a few ingredients
- ✅ Uses **Markdown formatting** for beautiful display
- ✅ Switch between **Ollama (local)** and **Hugging Face (cloud)** models
- ✅ Clean, responsive UI with **feedback loading states**
- ✅ Smart fallback architecture — ready for production or offline use

---

## 🧠 How It's Built

This project was originally inspired by the Scrimba AI Recipe Generator project but implemented completely independently.

- ❌ Did **not** use Scrimba to build this
- ❌ Did **not** initially use Hugging Face or Claude for AI inference
- ✅ Chose a more **economical, local-first approach** for development and testing

---

## 🛠️ AI Stack

### 🧠 **Ollama + Mistral (Local AI)**

I used [Ollama](https://ollama.com) running the **Mistral model** as my default AI backend —

> ✅ It's fast, free, works offline, and delivers high-quality generation  
> This makes Chef Claude a sustainable and practical solution for both development and real use.

### 🌐 **Hugging Face (Cloud Backup)**

Hugging Face is integrated as a backup AI engine — perfect for deployment on services like Vercel or Netlify.  
However, due to limited free token credits, I left it optional until ready to deploy.

---

## ⚙️ Key Improvements

- 🔁 **AI Model Toggle**  
  Users can select between local or cloud AI engines in the UI

- 🕒 **Loading Feedback**  
  Buttons show real-time feedback ("Generating...") while waiting for a recipe

- 💡 **Markdown Recipe Output**  
  AI responses are rendered beautifully using React Markdown with headings, bullets, and steps

---

## 📦 Tech Stack

- **React** – Core UI
- **React Markdown** – Rich rendering of AI output
- **Ollama** – Local AI runtime using `mistral` model
- **Hugging Face Inference API** – Optional cloud-based fallback
- **CSS Modules / Vanilla CSS** – Custom-styled inputs, buttons, and layout

---

## 📸 Demo

_Want a live demo?_  
You’ll need to either install Ollama or create a Hugging Face account.  
Instructions coming soon when deployed.

---

## 👨‍💻 Getting Started

1. Clone the repo
2. Run Ollama locally (`ollama run mistral`)
3. Add your Hugging Face API key to `.env` if desired:  
   env
   VITE_HF_API_KEY=your_token_here

4. Start the app:

bash
npm install
npm run dev

---

## 🙌 Author

Built by [Ricardo Diaz](https://github.com/RicardoDiaz85) — Design Engineer blending creativity, development, and AI to solve real-world problems.  
_“Everything I do or don’t, I do trusting in God.”_

---

## 🧭 Future Features

- Save & share generated recipes
- Automatically detect Ollama availability
- Deployable fallback to Hugging Face with user auth
