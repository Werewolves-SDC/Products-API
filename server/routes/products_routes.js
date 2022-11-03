/* eslint-disable no-param-reassign */
const Router = require('express-promise-router');
const db = require('../../database/index.js');
const query = require('../../database/queries.js');

const router = new Router();
module.exports = router;

router.get('/test', async (req, res) => {
  console.log('test route');
  // test db connection
  await db.query('SELECT NOW()');
  res.send();
});
// fetch a single product
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Single Product Requested');
  const { rows } = await db.query(query.oneProduct, [id]);
  console.log('rows', rows);
  res.status(200).json(rows);
});

router.get('/styles/:id', async (req, res) => {
  const { id } = req.params;
  const { rows: styles } = await db.query(query.styles, [id]);
  const { rows: photo_dump } = await db.query(query.photosByProduct, [id]);
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

router.get('/features/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(query.featuresByProduct, [id]);
  console.log(rows);
  res.status(200).json(rows);
});
