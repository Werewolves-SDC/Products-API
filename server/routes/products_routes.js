const Router = require('express-promise-router');
const db = require('../../database/index.js');

const router = new Router();
module.exports = router;

router.get('/test', async (req, res) => {
  console.log('test route');
  // test db connection
  await db.query('SELECT NOW()');
  res.send();
});
