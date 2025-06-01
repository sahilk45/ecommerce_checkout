const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Fetch all product variants (used by frontend landing page)
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Fetch single product by ID
app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Submit checkout form
app.post('/api/checkout', async (req, res) => {
  try {
    const { customer, card, product } = req.body;
    
    // Validate required fields
    if (!customer.name || !customer.email || !customer.phone) {
      return res.status(400).json({ error: 'Missing required customer information' });
    }
    
    if (!card.number || !card.expiry || !card.cvv) {
      return res.status(400).json({ error: 'Missing required card information' });
    }

    // Determine transaction status based on simulation code
    let status = 'approved';
    if (card.simulationCode === '2') status = 'declined';
    else if (card.simulationCode === '3') status = 'error';

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const last4 = card.number.replace(/\s/g, '').slice(-4);

    // Insert order into database
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
    const transporter = nodemailer.createTransporter({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Create email content based on status
    let emailSubject, emailHtml;
    
    if (status === 'approved') {
      emailSubject = `✅ Order Confirmation - ${orderNumber}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h1 style="color: #28a745; text-align: center; margin-bottom: 30px;">🎉 Order Confirmed!</h1>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Order Details</h2>
              <p><strong>Order Number:</strong> ${orderNumber}</p>
              <p><strong>Product:</strong> ${product.title || 'Converse Chuck Taylor All Star'}</p>
              <p><strong>Variant:</strong> ${product.variant}</p>
              <p><strong>Quantity:</strong> ${product.quantity}</p>
              <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">Approved ✅</span></p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Customer Information</h2>
              <p><strong>Name:</strong> ${customer.name}</p>
              <p><strong>Email:</strong> ${customer.email}</p>
              <p><strong>Phone:</strong> ${customer.phone}</p>
              <p><strong>Shipping Address:</strong><br>
                 ${customer.address}<br>
                 ${customer.city}, ${customer.state} ${customer.zip}</p>
            </div>
            
            <div style="background: #28a745; color: white; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-size: 16px;">Thank you for your purchase! Your order will be processed within 2-3 business days.</p>
            </div>
            
            <p style="text-align: center; margin-top: 20px; color: #666;">
              <small>This is an automated email from eSalesOne. Please do not reply.</small>
            </p>
          </div>
        </div>
      `;
    } else {
      emailSubject = `❌ Payment ${status === 'declined' ? 'Declined' : 'Failed'} - ${orderNumber}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h1 style="color: #dc3545; text-align: center; margin-bottom: 30px;">
              ${status === 'declined' ? '❌ Payment Declined' : '⚠️ Payment Error'}
            </h1>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Order Information</h2>
              <p><strong>Order Number:</strong> ${orderNumber}</p>
              <p><strong>Customer:</strong> ${customer.name}</p>
              <p><strong>Status:</strong> <span style="color: #dc3545; font-weight: bold;">${status.charAt(0).toUpperCase() + status.slice(1)}</span></p>
            </div>
            
            <div style="background: #dc3545; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 16px;">
                ${status === 'declined' ? 
                  'Your payment was declined. Please check your payment information and try again.' : 
                  'There was an error processing your payment. Please try again or contact support.'
                }
              </p>
            </div>
            
            <div style="text-align: center;">
              <a href="http://localhost:3000/checkout" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Try Again
              </a>
            </div>
            
            <p style="text-align: center; margin-top: 20px; color: #666;">
              <small>Need help? Contact our support team or try again with different payment information.</small>
            </p>
          </div>
        </div>
      `;
    }

    const mailOptions = {
      from: '"eSalesOne Store" <shop@esalesone.com>',
      to: customer.email,
      subject: emailSubject,
      html: emailHtml
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${customer.email} for order ${orderNumber}`);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the entire request if email fails
    }

    res.json({ 
      orderNumber, 
      status,
      message: status === 'approved' ? 'Order placed successfully!' : 'Order processed with issues.'
    });

  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// Fetch order by order number
app.get('/api/order/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const result = await pool.query(
      'SELECT * FROM orders WHERE order_number = $1',
      [orderNumber]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test email endpoint (for debugging)
app.post('/api/test-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransporter({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: '"eSalesOne Store" <shop@esalesone.com>',
      to: req.body.email || 'test@test.com',
      subject: 'Test Email from eSalesOne',
      html: '<h1>Test Email</h1><p>If you receive this, your email configuration is working!</p>'
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send test email', details: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📧 Mailtrap User: ${process.env.MAILTRAP_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🗄️  Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
});

module.exports = app;