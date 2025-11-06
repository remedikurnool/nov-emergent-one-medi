const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from root
app.use(express.static(__dirname));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║            🏥 ONE MEDI - Platform Router                   ║
║                                                            ║
║  ✅ Routing page running on http://localhost:${PORT}       ║
║                                                            ║
║  Click to access:                                          ║
║  🛍️  Customer App:     http://localhost:3001              ║
║  ⚙️  Admin Dashboard:  http://localhost:3002              ║
║  🏪  Vendor Dashboard: http://localhost:3003              ║
║  🔌  Backend API:      http://localhost:8001              ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
