// === Backend index.js (Complete Code) ===
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Fetch single product (optional)
app.get('/api/product', async (req, res) => {
  const result = await pool.query('SELECT * FROM products LIMIT 1');
  res.json(result.rows[0]);
});

// ✅ Fetch all product variants (used by frontend landing page)
app.get('/api/products', async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
});

// Submit checkout form
app.post('/api/checkout', async (req, res) => {
  const { customer, card, product } = req.body;
  let status = 'approved';
  if (card.simulationCode === '2') status = 'declined';
  else if (card.simulationCode === '3') status = 'error';

  const orderNumber = `ORD-${Date.now()}`;
  const last4 = card.number.slice(-4);

  const result = await pool.query(
    `INSERT INTO orders (order_number, name, email, phone, address, city, state, zip, card_last4, variant, quantity, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [
      orderNumber,
      customer.name,
      customer.email,
      customer.phone,
      customer.address,
      customer.city,
      customer.state,
      customer.zip,
      last4,
      product.variant,
      product.quantity,
      status,
    ]
  );

  // Send confirmation or failure email using Mailtrap
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailOptions = {
    from: 'shop@example.com',
    to: customer.email,
    subject: status === 'approved' ? 'Order Confirmation' : 'Order Failed',
    html: `<h1>Order ${status}</h1><p>Your order number is ${orderNumber}</p>`
  };

  await transporter.sendMail(mailOptions);

  res.json({ orderNumber, status });
});

// Fetch order by order number
app.get('/api/order/:orderNumber', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM orders WHERE order_number = $1',
    [req.params.orderNumber]
  );
  res.json(result.rows[0]);
});

// Start server
app.listen(4000, () => {
  console.log('Backend server running on http://localhost:4000');
});
