const express = require('express');

const app = express();
const port = 3000;

// CORS for cross-origin requests from frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Simple API - NO frontend serving
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from Backend Server!',
    timestamp: new Date().toISOString(),
    server: 'GitHub Actions Backend Pod',
    passwordBypassed: true
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});
