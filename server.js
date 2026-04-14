require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json()); // For handling JSON bodies

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected natively to MongoDB Atlas.'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Serve static frontend files from current directory
app.use(express.static(__dirname));

// --- API Endpoints ---

// Get all products (with optional ?category= filter)
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    
    // Fetch products from Atlas DB
    const rows = await Product.find(query);
    
    res.json({
      message: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback to index.html for unknown routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Live MongoDB Server running on http://localhost:${PORT}`);
});
