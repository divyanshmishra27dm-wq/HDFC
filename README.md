# HDFC Career HUB Tracker (Powered by NIIT)

A modern, production-grade tracking and milestone management dashboard built for the HDFC Career HUB initiative. Features real-time state synchronization, interactive status statistics, milestone filtering, live inline editing, export to CSV, and complete dark/light mode support.

---

## 🌟 Key Features

- **Modern HDFC Executive Design**: Navy, gold, and vibrant semantic status colors tailored to HDFC corporate identity with glassmorphism and subtle micro-animations.
- **Fullstack Ready**:
  - **Frontend**: Vite + React 18 with Lucide icons, responsive tables, modal creation, and instant inline editing.
  - **Backend**: Node.js + Express REST API with persistent storage, filtering, statistics, and CSV export endpoints.
- **Offline & Standalone Resilient**: The frontend includes a smart fallback layer: if the backend is waking up or temporarily unavailable, it automatically caches updates locally and keeps working smoothly.
- **1-Click Deployable**: Pre-configured with `render.yaml` for Render and `vercel.json` for Vercel.

---

## 📁 Project Structure

```
hdfc-career-hub-tracker/
├── frontend/                     # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Top bar with branding, live indicator, theme toggle
│   │   │   ├── SummaryCards.jsx  # Interactive status metric cards & progress bar
│   │   │   ├── FilterBar.jsx     # Search input, milestone dropdown, role filters
│   │   │   ├── TrackerTable.jsx  # Grouped milestone table with inline edit & delete
│   │   │   ├── AddActivityModal.jsx # Modal to add new tasks/deliverables
│   │   │   └── Toast.jsx         # Non-intrusive notifications
│   │   ├── data/
│   │   │   └── seed.json         # Master seed of 58 milestone activities
│   │   ├── api.js                # API integration layer with fallback
│   │   ├── index.css             # Design tokens & responsive styles
│   │   ├── App.jsx               # Application root logic
│   │   └── main.jsx              # Vite entry
│   ├── index.html
│   ├── package.json
│   ├── vercel.json               # Vercel SPA routing
│   └── vite.config.js            # Vite proxy config
│
├── backend/                      # Node.js + Express API
│   ├── data/
│   │   ├── seed.json             # 58 seeded milestone activities
│   │   └── store.json            # Persistent JSON database (auto-created)
│   ├── routes/
│   │   └── tracker.js            # REST API endpoints
│   ├── db.js                     # Persistence layer with memory fallback
│   ├── server.js                 # Express server & static asset host
│   ├── .env.example
│   └── package.json
│
├── render.yaml                   # 1-click Render blueprint
├── vercel.json                   # Root Vercel monorepo config
├── package.json                  # Root scripts (build, dev, start)
├── DEPLOYMENT.md                 # Complete Vercel & Render step-by-step guides
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Start the Backend API
```bash
npm run dev:backend
```
Backend runs on: `http://localhost:5000`

### 3. Start the Frontend Dev Server
```bash
npm run dev:frontend
```
Frontend runs on: `http://localhost:3000` (automatically proxies `/api` calls to port 5000)

---

## 🌐 Deployment to Cloud

See the detailed, step-by-step instructions in [DEPLOYMENT.md](file:///C:/Users/ananya.5.gupta/.gemini/antigravity-ide/scratch/hdfc-career-hub-tracker/DEPLOYMENT.md):

- **Frontend on Vercel + Backend on Render** (Recommended)
- **Fullstack on Render in a Single Web Service** (Zero extra services needed)
- **Railway / Fly.io / Heroku**
