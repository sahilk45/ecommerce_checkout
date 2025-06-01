// Improved backend server with better error handling and logging
// Save this as: Backend/index.js

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Allow both localhost formats
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Health check endpoint - Test this first
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    const dbResult = await pool.query('SELECT NOW() as current_time');
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'Connected',
      server_time: dbResult.rows[0].current_time
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      database: 'Disconnected',
      error: error.message
    });
  }
});

// ✅ Fetch all products (used by frontend landing page)
app.get('/api/products', async (req, res) => {
  try {
    console.log('📦 Fetching products...');
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    console.log(`✅ Found ${result.rows.length} products`);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.message
    });
  }
});

// Fetch single product by ID
app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Fetching product with ID: ${id}`);
    
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      console.log(`❌ Product not found: ${id}`);
      return res.status(404).json({ error: 'Product not found' });
    }
    
    console.log(`✅ Product found: ${result.rows[0].title}`);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({ 
      error: 'Failed to fetch product',
      message: error.message
    });
  }
});

// Submit checkout form
app.post('/api/checkout', async (req, res) => {
  console.log('🛒 Processing checkout...');
  
  try {
    const { customer, card, product } = req.body;
    
    // Log received data (excluding sensitive info)
    console.log('📋 Customer:', { name: customer?.name, email: customer?.email });
    console.log('🛍️  Product:', { variant: product?.variant, quantity: product?.quantity });
    
    // Validate required fields
    if (!customer?.name || !customer?.email || !customer?.phone) {
      console.log('❌ Missing customer information');
      return res.status(400).json({ error: 'Missing required customer information' });
    }
    
    if (!card?.number || !card?.expiry || !card?.cvv) {
      console.log('❌ Missing card information');
      return res.status(400).json({ error: 'Missing required card information' });
    }

    // Determine transaction status based on simulation code
    let status = 'approved';
    if (card.simulationCode === '2') status = 'declined';
    else if (card.simulationCode === '3') status = 'error';

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const last4 = card.number.replace(/\s/g, '').slice(-4);

    console.log(`💳 Processing order ${orderNumber} with status: ${status}`);

    // Insert order into database with better error handling
    const insertQuery = `
      INSERT INTO orders (order_number, name, email, phone, address, city, state, zip, card_last4, variant, quantity, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING *
    `;
    
    const values = [
      orderNumber,
      customer.name,
      customer.email,
      customer.phone,
      customer.address || '',
      customer.city || '',
      customer.state || '',
      customer.zip || '',
      last4,
      product.variant || 'Unknown',
      product.quantity || 1,
      status,
    ];

    const result = await pool.query(insertQuery, values);
    console.log('✅ Order saved to database');

    // Send confirmation email
    if (process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS) {
      try {
        await sendConfirmationEmail(customer, product, orderNumber, status);
        console.log('📧 Confirmation email sent');
      } catch (emailError) {
        console.error('❌ Email failed:', emailError.message);
        // Don't fail the entire request if email fails
      }
    } else {
      console.log('⚠️  Email not configured - skipping email send');
    }

    res.json({ 
      orderNumber, 
      status,
      message: status === 'approved' ? 'Order placed successfully!' : 'Order processed with issues.'
    });

  } catch (error) {
    console.error('❌ Error processing checkout:', error);
    res.status(500).json({ 
      error: 'Failed to process order',
      message: error.message
    });
  }
});

// Email sending function
async function sendConfirmationEmail(customer, product, orderNumber, status) {
  const transporter = nodemailer.createTransporter({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

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

  await transporter.sendMail(mailOptions);
}

// Fetch order by order number
app.get('/api/order/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;
    console.log(`🔍 Fetching order: ${orderNumber}`);
    
    const result = await pool.query(
      'SELECT * FROM orders WHERE order_number = $1',
      [orderNumber]
    );
    
    if (result.rows.length === 0) {
      console.log(`❌ Order not found: ${orderNumber}`);
      return res.status(404).json({ error: 'Order not found' });
    }
    
    console.log(`✅ Order found: ${orderNumber}`);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({ 
      error: 'Failed to fetch order',
      message: error.message
    });
  }
});

// Test email endpoint (for debugging)
app.post('/api/test-email', async (req, res) => {
  try {
    if (!process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASS) {
      return res.status(400).json({ 
        error: 'Email not configured',
        message: 'MAILTRAP_USER and MAILTRAP_PASS must be set in .env file'
      });
    }

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
    console.log('✅ Test email sent successfully');
    res.json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    res.status(500).json({ 
      error: 'Failed to send test email', 
      message: error.message
    });
  }
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('\n🚀 =====================================');
  console.log(`   Backend server running on http://localhost:${PORT}`);
  console.log('🚀 =====================================\n');
  console.log('📋 Available endpoints:');
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/products`);
  console.log(`   GET  http://localhost:${PORT}/api/product/:id`);
  console.log(`   POST http://localhost:${PORT}/api/checkout`);
  console.log(`   GET  http://localhost:${PORT}/api/order/:orderNumber`);
  console.log(`   POST http://localhost:${PORT}/api/test-email\n`);
  
  console.log('🔧 Configuration status:');
  console.log(`   📧 Mailtrap User: ${process.env.MAILTRAP_USER ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   🗄️  Database URL: ${process.env.DATABASE_URL ? '✅ Configured' : '❌ Not configured'}`);
  console.log('\n📚 Next steps:');
  console.log('   1. Test health endpoint: curl http://localhost:4000/api/health');
  console.log('   2. Check database tables exist');
  console.log('   3. Test products endpoint: curl http://localhost:4000/api/products');
  console.log('\n');
});

module.exports = app;