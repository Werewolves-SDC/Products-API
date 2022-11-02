const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier; const fs = require('fs');
const Transform = require("stream").Transform;
const Products = require('../csv_files/product.csv');
