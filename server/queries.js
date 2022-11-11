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

  skus: `
  SELECT skus.style_id, skus.id, skus.quantity, skus.size
  FROM products
  INNER JOIN styles
  ON products.product_id = styles.product_id
  INNER JOIN skus
  ON styles.style_id = skus.style_id
  WHERE styles.product_id= $1`,

  product: `
  SELECT json_build_object('productsInfo', jsonb_build_object(
    'id', products.product_id,
    'name', products.name,
    'slogan', products.slogan,
    'description', products.description,
    'category', products.category,
    'default_price', products.default_price,
    'features', (json_build_array(json_build_object('feature',features.feature, 'value',features.value)))
  )
  )
  FROM products
  INNER JOIN features
  ON products.product_id = features.product_id
  WHERE products.product_id= $1
  `,

  styleDetails: `
   SELECT
   styles.style_id AS "style_id",
   styles.name,
   styles.original_price,
   styles.sale_price,
   styles.default AS "default?",
   (
     SELECT jsonb_agg(jsonb_build_object(
       'thumbnail_url', photos.thumbnail_url,
       'url', photos.url
       )) AS photos
     FROM photos
     WHERE styles.style_id = photos.style_id
   ),
   (
     SELECT jsonb_agg(jsonb_build_object(
       'id', skus.id,
       'quantity', skus.quantity,
       'size', skus.size
     )) AS skus
     FROM skus
     WHERE styles.id = skus.style_id
   )
   FROM styles
   WHERE styles.product_id= $1
   `,

};
