// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','ngrok-skip-browser-warning','Accept','Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Log every request (helps debug whether OPTIONS reached your server)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} Host:${req.get('host')} Origin:${req.get('origin')} Headers: ${Object.keys(req.headers).join(',')}`);
  next();
});

// Explicit preflight handler (extra-sure)
app.options('*', (req, res) => {
  // These headers are normally set by cors(), but set them explicitly too
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,ngrok-skip-browser-warning,Accept,Authorization');
  return res.sendStatus(204);
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
