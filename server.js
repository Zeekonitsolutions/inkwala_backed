const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Test API - Check karne ke liye
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is working!' });
});

// Saare products fetch karne ke liye
app.get('/api/products', (req, res) => {
  const products = require('./products.json');
  res.json(products);
});

// Ek specific product fetch karne ke liye
app.get('/api/product/:id', (req, res) => {
  const products = require('./products.json');
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Instamojo se order confirm hoga toh yeh call hoga
app.post('/api/instamojo-webhook', async (req, res) => {
  const { order_id, payment_status, amount } = req.body;
  
  console.log('📦 New Order Received:', { order_id, payment_status, amount });
  
  // Yahan aap WhatsApp message ya email bhej sakte ho
  
  res.json({ received: true, order_id: order_id });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}/api/ping`);
});