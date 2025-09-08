const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all origins and allow ngrok header
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

app.use(express.json());

// Simple API
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from Backend Server!',
    timestamp: new Date().toISOString(),
    server: 'GitHub Actions Backend Pod',
    passwordBypassed: true
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});
