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
      title: 'id',
    },
    {
      id: 'current_product_id',
      title: 'current_product_id',
    },
    {
      id: 'related_product_id',
      title: 'related_product_id',
    },
  ],
});

const streamer = fs.createReadStream('../csv_files/related.csv');
const writer = fs.createWriteStream('../csv_files/clean_related.csv');

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

    chunk = csvStringifier.stringifyRecords([chunk]);

    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });
// write header
writer.write(csvStringifier.getHeaderString());
streamer.pipe(csv()).pipe(transformer).pipe(writer).on('finish', () => { console.log('finished'); });
