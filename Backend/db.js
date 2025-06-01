// Improved database connection with better error handling
// Save this as: Backend/db.js

const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool with better configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Additional configuration for better reliability
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to try connecting before timing out
});

// Test the database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    
    // Test if required tables exist
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name IN ('products', 'orders')
    `);
    
    const tables = result.rows.map(row => row.table_name);
    console.log('📋 Available tables:', tables);
    
    if (!tables.includes('products') || !tables.includes('orders')) {
      console.log('⚠️  Required tables missing. Please run the schema.sql file.');
      console.log('   Run: psql -d your_database -f Backend/schema.sql');
    }
    
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔧 Troubleshooting tips:');
    console.log('   1. Check if PostgreSQL is running');
    console.log('   2. Verify DATABASE_URL in .env file');
    console.log('   3. Ensure database exists');
    console.log('   4. Check username/password credentials');
  }
};

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

// Test connection when module is loaded
testConnection();

module.exports = pool;