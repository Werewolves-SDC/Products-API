/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
const express = require('express');
const App = require('express');
require('dotenv').config();
require('./db_connection');
const compression = require('compression');
// routes uses custom constructed middelware based on
// express-promise-router
const app = App();
app.use(compression());
const apply_routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
  console.log(`A ${req.method} request was made to the ${req.url} endpoint`);
  if (req.body && Object.keys(req.body).length) {
    console.log(`with a payload of ${JSON.stringify(req.body)}`);
  }
  next();
};
// TODO: remove logger action from prod code
app.use(logger);

// for loader.io testing -->
app.use(express.static('./staticFiles'));

apply_routes(app);

app.listen(process.env.SERVER_PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server connected on ${process.env.SERVER_PORT}`);
});

// TODO: move server start to db_connection to make sure db is started
// before server is listening

/*

export const startServer = () => {
  app.listen(process.env.SERVER_PORT, '0.0.0.0', (err) => {
    if (err) {
      console.log("Could not start server:", err);
      setTimeout(startServer, 1000);
    }
    console.log('server connected on ${process.env.SERVER_PORT});
  })
}

startServer();

pool.connect();

pool.on('connect', () => {
  console.log("Database connected...");
  startServer();
})
*/
