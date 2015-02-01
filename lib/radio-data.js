'use strict';

var fs = require('fs'),
  _ = require('lodash'),
  radioPath = 'data/tmp/radios.json',
  currentRadios = [];

function readRadios() {
  if (!fs.existsSync(radioPath)) {
    currentRadios = [];
  } else {
    currentRadios = JSON.parse(fs.readFileSync(radioPath).toString());
  }

  return currentRadios;
}

function writeRadios() {
  var stringified = JSON.stringify(currentRadios);

  fs.writeFileSync(radioPath, stringified);
}

function unique(numbers) {
  // sort them so getting unique values is faster
  numbers.sort(function (a, b) {
    return a - b;
  });
  return _.uniq(numbers, true);
}

function addRadios(numbers) {
  var added = [];
  // get the current radios
  currentRadios = readRadios();
  added = _.difference(numbers, currentRadios);
  // add the new radios to the current ones
  currentRadios = currentRadios.concat(numbers);
  currentRadios = unique(currentRadios);
  // write them to radios.json
  writeRadios();
  return unique(added);
}

function removeRadios(numbers) {
  var removed = [];
  // get the current radios
  currentRadios = readRadios();
  // get the removed radios
  removed = _.intersection(currentRadios, numbers);
  // remove the new radios from the current ones
  // note: if new radio isn't in the current radios, it doesn't care
  // so you could do [1,2,3] -> remove [2,3,4] and get [1] back
  currentRadios = _.difference(currentRadios, numbers);
  currentRadios = unique(currentRadios);
  // write them to radios.json
  writeRadios();
  return unique(removed);
}

exports.readRadios = readRadios;
exports.writeRadios = writeRadios;
exports.addRadios = addRadios;
exports.removeRadios = removeRadios;