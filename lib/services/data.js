'use strict';
var fs = require('fs');

/**
 * read list from json
 * @return {[]}
 */
function read(path) {
  if (!fs.existsSync(path)) {
    return [];
  } else {
    return JSON.parse(fs.readFileSync(path).toString());
  }
}

/**
 * write list to json
 */
function write(path, data) {
  var stringified = JSON.stringify(data);

  fs.writeFileSync(path, stringified);
}

exports.read = read;
exports.write = write;