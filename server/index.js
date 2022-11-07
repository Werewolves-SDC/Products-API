/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
const express = require('express');
const App = require('express');
require('dotenv').config();
const { Pool } = require('pg');
// routes uses custom constructed middleware based on
// express-promise-router
const apply_routes = require('./routes');

const app = App();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
  console.log(`A ${req.method} request was made to the ${req.url} endpoint`);
  if (req.body && Object.keys(req.body).length) {
    console.log(`with a payload of ${JSON.stringify(req.body)}`);
  }
  next();
};

app.use(logger);
apply_routes(app);

// db connection logic

const config = {
  password: process.env.PG_PASS,
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
};

const pool = new Pool(config);

// receives query info from routes
module.exports = {
  query: (text, params) => pool.query(text, params)
    .catch(console.log),
};
// **************************
// Start server only after db pool is connected

const startServer = () => {
  app.listen(process.env.SERVER_PORT, '0.0.0.0', (err) => {
    if (err) {
      console.log('err, attempting restart.....', err);
      setTimeout(startServer, 1000);
    }
    console.log(`node server connected on port: ${process.env.SERVER_PORT}`);
  });
};

pool.connect();
// connection events -->
pool.on('connect', () => {
  console.log('postgres pool connected, awaiting queries...');
  startServer();
});
pool.on('acquire', () => {
  console.log('PG client acquired...');
});
pool.on('error', (err) => {
  console.log('error connecting db_pool', err);
});
