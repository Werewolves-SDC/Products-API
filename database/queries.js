
module.exports = {
  oneProduct: 'SELECT * FROM Products WHERE product_id= $1',
  styles: `
  SELECT styles.style_id, styles."name", styles.original_price, styles.sale_price, styles."default"
  FROM products
  INNER JOIN styles
  ON products.product_id = styles.product_id
  WHERE products.product_id = $1
  `,
  featuresByProduct: 'SELECT * FROM features WHERE features._product_id= $1',
  photosByProduct: `
  SELECT photos.style_id, photos.thumbnail_url, photos.url
  FROM styles
  INNER JOIN photos ON styles.style_id = photos.style_id
  WHERE styles.product_id= $1
  `,
};


