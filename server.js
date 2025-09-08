const express = require('express');
const localtunnel = require('localtunnel');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// simple API endpoint
app.get('/', (req, res) => {
  res.send('Hello World from GitHub Actions via LocalTunnel!');
});

app.listen(port, async () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);

  try {
    const tunnel = await localtunnel({ port: port });
    console.log(`🌐 Public URL: ${tunnel.url}`);

    // write the public URL into config.js for the frontend
    const configContent = `window.BACKEND_URL="${tunnel.url}";`;
    const configPath = path.join(__dirname, 'frontend', 'config.js');
    fs.writeFileSync(configPath, configContent);
    console.log(`📝 Wrote backend URL to ${configPath}`);

    // Keep server running for 5 minutes
    setTimeout(() => {
      console.log('🛑 Shutting down after 5 minutes...');
      tunnel.close();
      process.exit(0);
    }, 300000);

    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
  } catch (error) {
    console.error('❌ Error creating tunnel:', error);
  }
});
