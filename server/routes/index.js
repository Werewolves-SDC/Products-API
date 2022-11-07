const products = require('./products_routes');

module.exports = (app) => {
  app.use('/', products);
};
