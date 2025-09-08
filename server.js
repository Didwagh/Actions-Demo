const express = require('express');
const localtunnel = require('localtunnel');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// ✅ Serve the frontend folder as static files
app.use(express.static(path.join(__dirname, 'frontend')));

// simple API endpoint
app.get('/api', (req, res) => {
  res.send('Hello World from GitHub Actions via LocalTunnel!');
});

app.listen(port, async () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);

  try {
    const tunnel = await localtunnel({ port: port });
    console.log(`🌐 Public URL: ${tunnel.url}`);
    console.log(`👉 Frontend available at: ${tunnel.url}/index.html`);
    console.log(`👉 API available at: ${tunnel.url}/api`);

    // write backend URL into config.js for frontend
    const configContent = `window.BACKEND_URL="${tunnel.url}/api";`;
    const configPath = path.join(__dirname, 'frontend', 'config.js');
    fs.writeFileSync(configPath, configContent);
    console.log(`📝 Wrote backend URL to ${configPath}`);

    // Keep server alive 5 minutes
    setTimeout(() => {
      console.log('🛑 Shutting down after 5 minutes...');
      tunnel.close();
      process.exit(0);
    }, 300000);

    tunnel.on('close', () => console.log('Tunnel closed'));
  } catch (error) {
    console.error('❌ Error creating tunnel:', error);
  }
});
