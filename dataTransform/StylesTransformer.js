/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier; const fs = require('fs');
const { Transform } = require('stream');

const csvStringifier = createCsvStringifier({
  header: [
    {
      id: 'id',
      title: 'style_id',
    },
    {
      id: 'productId',
      title: 'product_id',
    },
    {
      id: 'name',
      title: 'name',
    },
    {
      id: 'original_price',
      title: 'original_price',
    },
    {
      id: 'sale_price',
      title: 'sale_price',
    },
    {
      id: 'default_style',
      title: 'default',
    },
  ],
});

const streamer = fs.createReadStream('../csv_files/styles.csv');
const writer = fs.createWriteStream('../csv_files/clean_styles.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    for (const key in chunk) {
      const keyTrimmer = key.trim();
      chunk[keyTrimmer] = chunk[key];
      if (key !== keyTrimmer) {
        delete chunk[key];
      }
    }
    const originalPriceNumbersAllowed = chunk.original_price.replace(/\D/g, '');
    chunk.original_price = originalPriceNumbersAllowed;
    const salePriceNumbersAllowed = chunk.original_price.replace(/\D/g, '');
    chunk.original_price = salePriceNumbersAllowed;
    const originalPriceMultiplier = (chunk.original_price * 10) / 100;
    chunk.original_price = originalPriceMultiplier;
    // const productIDNumsOnly = chunk.original_price.replace(/\D/g, '');
    // chunk.productIDNumsOnly = productIDNumsOnly;

    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });
// write header
writer.write(csvStringifier.getHeaderString());
streamer.pipe(csv()).pipe(transformer).pipe(writer).on('finish', () => { console.log('finished'); });
