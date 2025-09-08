const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all origins, methods, and headers
app.use(cors({
  origin: '*', // Allow requests from any domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Optional: Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Simple API
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from Backend Server!',
    timestamp: new Date().toISOString(),
    server: 'Backend Pod'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});
