// queries -->
module.exports = {
  oneProduct: 'SELECT product_id, name, slogan, description, category, default_price FROM Products WHERE product_id= $1',

  styles: `
  SELECT styles.style_id, styles."name", styles.original_price, styles.sale_price, styles."default"
  FROM products
  INNER JOIN styles
  ON products.product_id = styles.product_id
  WHERE products.product_id = $1
  `,

  featuresByProduct: 'SELECT features.feature, features.value FROM features WHERE features.product_id= $1',

  photosByProduct: `
  SELECT photos.style_id, photos.thumbnail_url, photos.url
  FROM styles
  INNER JOIN photos ON styles.style_id = photos.style_id
  WHERE styles.product_id= $1
  `,

  relatedProducts: 'SELECT related.related_product_id FROM related WHERE related.current_product_id= $1',
};
