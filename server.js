// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Use cors() but allow the custom ngrok header and OPTIONS
app.use(cors({
  origin: (origin, cb) => cb(null, true), // allow all origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning', 'Accept', 'Authorization']
}));

// Ensure express responds to preflight OPTIONS quickly
app.options('*', (req, res) => {
  // cors() middleware already set the proper headers, just end the request
  res.sendStatus(204);
});

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from Backend Server!',
    timestamp: new Date().toISOString(),
    server: 'GitHub Actions Backend Pod',
    passwordBypassed: true,
    gotHost: req.get('host')
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});
