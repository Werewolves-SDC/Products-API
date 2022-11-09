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
// fetch a single product -- products_features
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  // console.log('Single Product Requested');
  const [productsQuery, featuresQuery] = await Promise.all([
    db.query(query.oneProduct, [id]),
    db.query(query.featuresByProduct, [id]),
  ]);

  const product = productsQuery.rows;
  const features = featuresQuery.rows;

  const productsInfo = product[0];
  productsInfo.features = features[0];
  res.status(200).json(productsInfo);
});
// styleDetails.API
router.get('/styles/:id', async (req, res) => {
  const { id } = req.params;

  const [
    stylesQuery,
    photosQuery,
  ] = await Promise.all([
    db.query(query.styles, [id]),
    db.query(query.photosByProduct, [id]),
  ]);
  const styles = stylesQuery.rows;
  const photo_dump = photosQuery.rows;

  const styleDetails = { product_id: id };

  styles.forEach((style) => {
    style.photos = [];
    photo_dump.forEach((photo) => {
      if (style.style_id === photo.style_id) {
        const { thumbnail_url, url } = photo;
        style.photos.push({ thumbnail_url, url });
      }
    });
  });

  styleDetails.results = styles;
  res.status(200).send(styleDetails);
});
// related;
router.get('/related/:id', async (req, res) => {
  const { id } = req.params;
  const { rows: relatedProducts } = await db.query(query.relatedProducts, [id]);
  // console.log(relatedProducts);
  res.status(200).send(relatedProducts);
});
