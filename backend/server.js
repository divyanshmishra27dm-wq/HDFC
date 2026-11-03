const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const trackerRoutes = require('./routes/tracker');

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/tracker', trackerRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'HDFC Career HUB Tracker API',
    uptime: process.uptime()
  });
});

// Serve static frontend build if available (useful for monolithic Render deployment)
const frontendDistPath = path.join(__dirname, '../frontend/dist');
const localDistPath = path.join(__dirname, 'public');

if (require('fs').existsSync(frontendDistPath)) {
  console.log(`Serving static frontend build from: ${frontendDistPath}`);
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else if (require('fs').existsSync(localDistPath)) {
  console.log(`Serving static files from: ${localDistPath}`);
  app.use(express.static(localDistPath));
} else {
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>HDFC Career HUB Tracker API</title></head>
        <body style="font-family: sans-serif; padding: 40px; line-height: 1.6; max-width: 600px; margin: auto;">
          <h2 style="color: #003580;">HDFC Career HUB Tracker API</h2>
          <p>Status: <span style="color: #2e7d32; font-weight: bold;">Active</span></p>
          <p>Endpoints:</p>
          <ul>
            <li><a href="/api/health">/api/health</a> - Health check</li>
            <li><a href="/api/tracker">/api/tracker</a> - All activities</li>
            <li><a href="/api/tracker/stats">/api/tracker/stats</a> - Summary statistics</li>
            <li><a href="/api/tracker/milestones">/api/tracker/milestones</a> - Milestones</li>
            <li><a href="/api/tracker/export/csv">/api/tracker/export/csv</a> - CSV download</li>
          </ul>
        </body>
      </html>
    `);
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error', details: err.message });
});

// Load data (Postgres or local files), then start listening
const db = require('./db');
db.init().then(() => app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 HDFC Tracker Backend API listening on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Tracker API: http://localhost:${PORT}/api/tracker`);
  console.log(`=========================================`);
})).catch(err => {
  console.error('Failed to initialise data store:', err);
  process.exit(1);
});
