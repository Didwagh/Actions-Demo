const express = require('express');
const localtunnel = require('localtunnel');
const path = require('path');

const app = express();
const port = 3000;

// ✅ Serve frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Simple API
app.get('/api', (req, res) => {
  res.send('Hello World from GitHub Actions via LocalTunnel!');
});

(async () => {
  const server = app.listen(port, async () => {
    console.log(`🚀 Server running at http://localhost:${port}`);

    try {
      const tunnel = await localtunnel({ port });
      console.log(`🌐 Public URL: ${tunnel.url}`);
      console.log(`👉 Frontend: ${tunnel.url}/index.html`);
      console.log(`👉 API: ${tunnel.url}/api`);

      // Emit tunnel URL for GitHub Actions
      console.log(`::set-output name=url::${tunnel.url}`);

      // Keep alive 5 minutes
      setTimeout(() => {
        console.log('🛑 Shutting down...');
        tunnel.close();
        server.close();
        process.exit(0);
      }, 300000);
    } catch (err) {
      console.error('❌ Tunnel error:', err);
    }
  });
})();
