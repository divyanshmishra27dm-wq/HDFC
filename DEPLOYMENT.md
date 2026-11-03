# Deployment Guide: HDFC Career HUB Tracker

This repository is pre-configured for instant zero-hassle deployment on modern cloud platforms:
- **Vercel** (Recommended for the React Frontend)
- **Render** (Recommended for the Node.js Express Backend or Fullstack)
- **Railway / Fly.io / Heroku** (Alternative fullstack hosts)

---

## Architecture Overview

```
hdfc-career-hub-tracker/
├── frontend/               # Vite + React 18 Single Page Application
│   ├── src/
│   │   ├── components/     # Header, SummaryCards, FilterBar, TrackerTable, Modals, Toast
│   │   ├── api.js          # Unified API client with automatic offline/local fallback
│   │   └── index.css       # HDFC Corporate design system with dark/light themes
│   ├── vercel.json         # Vercel configuration with SPA routing
│   └── vite.config.js      # Vite build & local development proxy
├── backend/                # Node.js + Express REST API
│   ├── routes/tracker.js   # CRUD endpoints (/api/tracker, /api/tracker/stats, etc.)
│   ├── data/seed.json      # Master 58 milestone activity records
│   ├── db.js               # Data access & persistence layer
│   └── server.js           # Express server & static asset host
├── render.yaml             # Render 1-click blueprint
├── vercel.json             # Root Vercel config for monorepo deployment
└── package.json            # Root workspace scripts
```

---

## Option 1: Split Architecture (Recommended)
> **Frontend on Vercel** (lightning-fast edge CDN) + **Backend on Render** (free Node.js web service).

### Step 1: Deploy Backend to Render

1. Create a free account at [render.com](https://render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub/GitLab repository.
4. Fill in the service details:
   - **Name**: `hdfc-tracker-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `CORS_ORIGIN` = `*` (or your Vercel frontend URL once deployed)
6. Click **Create Web Service**.
7. Copy your backend's public URL (e.g., `https://hdfc-tracker-api.onrender.com`).
   - Test it by opening `https://hdfc-tracker-api.onrender.com/api/health` in your browser.

---

### Step 2: Deploy Frontend to Vercel

1. Create a free account at [vercel.com](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Select your repository.
4. In the Project Configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and choose `frontend` (or leave as root; the root `vercel.json` will auto-detect).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://hdfc-tracker-api.onrender.com` *(Replace with your Render backend URL from Step 1)*
6. Click **Deploy**.
7. Your app is live with SSL, global CDN, and real-time backend synchronization!

---

## Option 2: Fullstack on Render (Single Web Service)
> Host both Frontend and Backend on a **single free Render service**. Zero extra services needed!

Render will build the React frontend into static assets and let Express serve both the `/api/*` endpoints and the UI.

1. In [render.com](https://render.com), click **New +** > **Web Service**.
2. Connect your repository.
3. Configure the service:
   - **Name**: `hdfc-career-hub-tracker`
   - **Root Directory**: *(leave blank / repository root)*
   - **Environment**: `Node`
   - **Build Command**: `npm run install:all && npm run build:frontend`
   - **Start Command**: `npm run start`
   - **Plan**: `Free`
4. Under **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
5. Click **Create Web Service**.
6. Render will automatically build the React app and launch Express. When ready, your tracker will be live on your `.onrender.com` domain!

---

## Option 3: Deploy to Railway

1. Sign in at [railway.app](https://railway.app).
2. Click **New Project** > **Deploy from GitHub repo**.
3. Select this repository.
4. Under **Settings** -> **Build**:
   - **Build Command**: `npm run install:all && npm run build:frontend`
   - **Start Command**: `npm run start`
5. Under **Variables**:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
6. Click **Generate Domain**. Your fullstack application will be live immediately!

---

## Local Development Setup

To run and test the complete application locally on your computer:

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)

### Quick Start (Run Both Together)

1. Open a terminal in the project root:
   ```bash
   cd hdfc-career-hub-tracker
   ```

2. Install all dependencies:
   ```bash
   npm run install:all
   ```

3. Start backend in terminal 1:
   ```bash
   npm run dev:backend
   ```
   *Runs at `http://localhost:5000`*

4. Start frontend in terminal 2:
   ```bash
   npm run dev:frontend
   ```
   *Runs at `http://localhost:3000` with live proxying to backend `/api`*

5. Open [http://localhost:3000](http://localhost:3000) in your browser!
