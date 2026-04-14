const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from current directory
app.use(express.static(__dirname));

// =======================
// REST API ENDPOINTS
// =======================

// 1. GET all products (or filter by category)
app.get('/api/products', (req, res) => {
  const category = req.query.category;
  let sql = 'SELECT * FROM Products';
  let params = [];
  
  if (category) {
    sql += ' WHERE category = ?';
    params.push(category);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// 2. GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const sql = 'SELECT * FROM Products WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    
    res.json({ message: 'success', data: row });
  });
});

// Fallback to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
