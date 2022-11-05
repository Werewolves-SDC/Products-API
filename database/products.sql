-- CREATE DATABASE sdc_products;
\c sdc_products;

CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL NOT NULL,
  "product_id" INT NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "slogan" VARCHAR(1000) NOT NULL,
  "description" VARCHAR(1000) NOT NULL,
  "category" VARCHAR(1000) NOT NULL,
  "default_price" DECIMAL NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "features" (
  "id" SERIAL NOT NULL,
  "product_id" INT NOT NULL,
  "feature" VARCHAR(100),
  "value" VARCHAR(1000),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "styles" (
  "id" SERIAL NOT NULL,
  "style_id" INT NOT NULL,
  "product_id" INT NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "original_price" DECIMAL NOT NULL,
  "sale_price" DECIMAL,
  "default" BOOLEAN,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "photos" (
  "id" SERIAL NOT NULL,
  "style_id" INT NOT NULL,
  "thumbnail_url" VARCHAR(300) NOT NULL,
  "url" VARCHAR(300) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "skus" (
  "id" SERIAL NOT NULL,
  "style_id" INT NOT NULL,
  "size" VARCHAR(100),
  "quantity" INT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "cart" (
  "id" SERIAL NOT NULL,
  "sku" INT NOT NULL,
  "quantity" INT NOT NULL,
  "size" INT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "related" (
  "id" SERIAL NOT NULL,
  "current_product_id" INT NOT NULL,
  "related_product_id" INT NOT NULL
);

-- CREATE INDEX idx_styleID_styles
-- ON styles(style_id);

-- CREATE INDEX idx_product_id_products
-- ON products(product_id);

-- CREATE INDEX idx_photos_styleId
-- ON photos(style_id);

-- CREATE INDEX idx_features_product_id
-- ON features(product_id);

-- CREATE INDEX idx_skus_styleId
-- ON skus(style_id);

-- CREATE INDEX idx_related_product_id
--   ON related(current_product_id);

-- for testing:

-- DROP INDEX idx_product_id_products;

-- DROP INDEX idx_photos_styleId;

-- DROP INDEX idx_features_product_id;

-- DROP INDEX idx_skus_styleId;

-- DROP INDEX idx_styleID_styles;

-- \COPY products FROM 'csv_files/clean_product.csv' DELIMITER ',' CSV HEADER;
-- \COPY features FROM 'csv_files/clean_features.csv' DELIMITER ',' CSV HEADER;
-- \COPY styles FROM 'csv_files/clean_styles.csv' DELIMITER ',' CSV HEADER;
-- \COPY photos FROM 'csv_files/clean_photos.csv' DELIMITER ',' CSV HEADER;
-- \COPY skus FROM 'csv_files/clean_skus.csv' DELIMITER ',' CSV HEADER;
-- \COPY cart FROM 'csv_files/clean_cart.csv' DELIMITER ',' CSV HEADER; ***DID NOT USE***
-- \COPY related FROM 'csv_files/clean_related.csv' DELIMITER ',' CSV HEADER;

-- psql sdc_products < products.sql