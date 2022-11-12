/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
const Router = require('express-promise-router');
const db = require('../db_connection.js');
const query = require('../queries.js');

const router = new Router();
module.exports = router;

router.get('/test', async (req, res) => {
  // console.log('test route');
  // test db connection
  // await db.query('SELECT NOW()');
  res.status(200).send('hello world');
});

router.get('/related/:id', async (req, res) => {
  const { id } = req.params;
  const { rows: relatedProducts } = await db.query(query.relatedProducts, [id]);
  // console.log(relatedProducts);
  res.status(200).send(relatedProducts);
});

router.get('/product/:id', async (req, res) => {
  const { id } = req.params;

  console.log('Single Product Requested');
  const { rows: productsInfo } = await db.query(query.product, [id]);
  res.status(200).json(productsInfo[0].json_build_object);
});

router.get('/styles/:id', async (req, res) => {
  const { id } = req.params;
  const { rows: styles } = await db.query(query.styleDetails, [id]);
  const styleDetails = {
    product_id: id,
    results: styles,
  };
  res.status(200).send(styleDetails);
});

router.get('/skus/:id', async (req, res) => {
  const { id } = req.params;
  const { rows: skus } = await db.query(query.skus, [id]);
  res.status(200).send(skus);
});
