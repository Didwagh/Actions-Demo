const express = require('express');
const localtunnel = require('localtunnel');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from GitHub Actions via LocalTunnel!');
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  
  try {
    // Create localtunnel
    const tunnel = await localtunnel({ port: port });
    console.log(`🌐 Public URL: ${tunnel.url}`);
    console.log(`🚀 Your server is now accessible worldwide!`);
    
    // Keep the server running for 2 minutes
    console.log('⏰ Server will run for 2 minutes...');
    setTimeout(() => {
      console.log('🛑 Shutting down after 2 minutes...');
      tunnel.close();
      process.exit(0);
    }, 120000); // 2 minutes = 120,000 ms
    
    // Handle tunnel errors
    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
    
  } catch (error) {
    console.error('❌ Error creating tunnel:', error);
    console.log('Server running locally only on port', port);
    
    // Still keep server running for 2 minutes even if tunnel fails
    setTimeout(() => {
      console.log('Shutting down after 2 minutes...');
      process.exit(0);
    }, 600000);
  }
});