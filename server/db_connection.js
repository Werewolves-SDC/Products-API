/* eslint-disable func-names */
const { Pool } = require('pg');

const config = {
  password: process.env.PG_PASS,
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
};

const pool = new Pool(config);

pool.connect();

pool.on('connect', () => {
  console.log('postgres pool connected, awaiting queries');
});

pool.on('error', (err) => {
  console.log('error connecting db_pool', err);
});

// receives query info from routes
module.exports = {
  query: (text, params) => pool.query(text, params)
    .catch(console.log),
};

module.exports = pool;
