/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
const express = require('express');
const App = require('express');
require('dotenv').config();
const path = require('path');
// routes uses custom constructed middelware based on
// express-promise-router
const routes = require('./routes/products_routes.js');

const app = App();
const db = require('../database/index.js');

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
app.use('/', routes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server connected on ${process.env.PORT}`);
});
