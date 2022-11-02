const { Pool, Client } = require('pg');

const config = {
  user: 'cole',
  host: '127.0.0.1',
  database: 'sdc_products',
  password: 'sharpshooter',
  port: 5432,
};

const pool = new Pool(config);

pool.on('error', (error) => {
  console.error('idle client error', error.message, error.stack);
});
pool.on('connect', () => {
  console.log('connected to the database');
});

// receives query info from routes
module.exports = {
  query: (text, params) => {
    pool.query(text, params)
      .then((res) => console.log(res.rows))
      .catch(console.log);
  },
};
