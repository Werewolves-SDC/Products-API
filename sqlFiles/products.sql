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
  "sku" INT NOT NULL,
  "quantity" INT NOT NULL,
  "size" INT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "cart" (
  "id" SERIAL NOT NULL,
  "sku" INT NOT NULL,
  "quantity" INT NOT NULL,
  "size" INT,
  PRIMARY KEY ("id")
);






