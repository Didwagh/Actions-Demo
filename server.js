const express = require('express');
const localtunnel = require('localtunnel');

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
    server: 'GitHub Actions Backend Pod'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

(async () => {
  const server = app.listen(port, async () => {
    console.log(`🚀 Backend server running at http://localhost:${port}`);
    
    try {
      const tunnel = await localtunnel({ port });
      console.log(`🌐 Public Backend URL: ${tunnel.url}`);
      console.log(`👉 API Endpoint: ${tunnel.url}/api`);
      console.log(`👉 Health Check: ${tunnel.url}/health`);
      
      // Keep alive longer for frontend to connect
      setTimeout(() => {
        console.log('🛑 Backend shutting down...');
        tunnel.close();
        server.close();
        process.exit(0);
      }, 700000); // 11+ minutes
    } catch (err) {
      console.error('❌ Backend tunnel error:', err);
    }
  });
})();