'use strict';

const fs = require('fs');

const html = fs.readFileSync(`${__dirname}/index.html`).toString();

module.exports = (context, callback) => {
  callback(undefined, html);
};
