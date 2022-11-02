CREATE TABLE "new"."Products" ("_id" Serial,"product_id" INT,"campus" VARCHAR,"name" VARCHAR,"slogan" VARCHAR,"description" VARCHAR,"category" VARCHAR,"default_price" INT,"created_at" DATE,"updated_at" DATE);

CREATE TABLE "new"."Features" ("_id" SERIAL,"product_id" INT,"feature" VARCHAR,"value" VARCHAR);

CREATE TABLE "new"."Styles" ("_id" SERIAL,"style_id" INT,"product_id" INT,"name" VARCHAR,"original_price" INT,"sale_price" INT,"default" BOOLEAN);

CREATE TABLE "new"."Photos" ("_id" SERIAL,"style_id" INT,"thumbnail_url" VARCHAR,"url" VARCHAR);

CREATE TABLE "new"."Skus" ("_id" SERIAL,"sku" INT,"quantity" INT,"size" VARCHAR);

CREATE TABLE "new"."Cart" ("_id" SERIAL,"sku" INT,"quantity" INT,"size" VARCHAR);

ALTER TABLE "new"."Styles" ADD FOREIGN KEY ("column_2") REFERENCES "new"."Products" ("column_2");

ALTER TABLE "new"."Products" ADD FOREIGN KEY ("column_2") REFERENCES "new"."Features" ("column_2");

ALTER TABLE "new"."Photos" ADD FOREIGN KEY ("column_2") REFERENCES "new"."Styles" ("column_7");

ALTER TABLE "new"."Styles" ADD FOREIGN KEY ("column_7") REFERENCES "new"."Skus" ("column_2");

ALTER TABLE "new"."Skus" ADD FOREIGN KEY ("column_2") REFERENCES "new"."Cart" ("column_2");