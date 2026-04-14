# Shrine Seeker Compendium - UI 🗡️

A sleek, responsive React front-end for the **Shrine Seeker Compendium**, a specialized Large Language Model fine-tuned on *The Legend of Zelda: Breath of the Wild* lore. 

This interface is designed with a "Sheikah Slate" aesthetic, featuring glowing cyan accents, dark topographical slate backgrounds, and a highly responsive chat window. It serves as the primary user interface for interacting with a locally hosted, 70-billion parameter fine-tuned LLM.

## 🏗️ Architecture & Tech Stack

This project is built for speed and modern web standards, completely bypassing legacy tools like Create React App.

* **Framework:** React 18
* **Build Tool:** Vite (for near-instant server starts and optimized builds)
* **Styling:** Tailwind CSS v4 (using the modern `@tailwindcss/vite` plugin system)
* **Backend Integration:** Connects via REST to a local FastAPI Python server, which pipes requests to an Apple MLX pipeline running Llama 3 70B Instruct natively on Apple Silicon unified memory.

## 🚀 Getting Started (Local Development)

### Prerequisites
1. **Node.js:** Ensure you have Node.js (v18+) installed.
2. **Backend Server:** The Shrine Seeker MLX backend must be running locally on port `8000` to handle inference requests.

### Installation

1. Clone this repository:
    git clone https://github.com/your-username/shrine-seeker-ui.git
    cd shrine-seeker-ui

2. Install dependencies:
    npm install

3. Start the Vite development server:
    npm run dev

4. Open your browser and navigate to `http://localhost:5173`.

## 🔌 Connecting to the MLX Backend

By default, the front-end sends `POST` requests to `http://localhost:8000/chat`. 

If your FastAPI server is running on a different port or you are routing traffic through a secure tunnel (like Cloudflare Tunnels) for production deployment, update the `fetch` URL in `src/components/ShrineSeekerUI.jsx`:

    // src/components/ShrineSeekerUI.jsx
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

## 🎨 Design Philosophy

The UI uses custom Tailwind v4 utility classes to mimic the Sheikah Slate:
* **Slate Body:** `bg-slate-800` with rounded corners and a distinct `border-cyan-700` glow.
* **Typography:** `text-cyan-400` tracking headers with drop-shadow effects for a neon visual.
* **Message Bubbles:** Muted gold/bronze for user inputs and dark translucent blue with cyan borders for the Assistant's lore responses.

## 🚀 Deployment Plans

This front-end is fully statically generatable. Future architecture plans include deploying this UI to a static host (AWS Amplify, Vercel, or Netlify) and establishing a secure tunnel back to the Apple Silicon hardware to handle the heavy 70B inference remotely without incurring cloud GPU costs.