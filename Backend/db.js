const { Pool } = require('pg');

const pool = new Pool({
  user: 'liaqatali0922',
  host: 'db-cluster-1-6461.8nk.cockroachlabs.cloud',
  database: 'practice',
  password: '4FhMmUXoeYoGDC_NPaOCeg',
  port: 26257, // Default CockroachDB port
  ssl: {
    rejectUnauthorized: false // Disable SSL certificate validation for testing, use true in production
  }
});
// Check if there is an error during pool creation
pool.on('error', (err) => {
  console.error('Error in the database connection pool:', err);
});

// Callback to indicate when the pool has connected successfully
pool.on('connect', () => {
  console.log('Connected to the database');
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
