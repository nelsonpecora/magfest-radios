'use strict';

var _ = require('lodash'),
  radioPath = 'data/tmp/radios.json',
  data = require('./data');

function listRadios() {
  return data.read(radioPath);
}

/**
 * make list of radios unique
 * @param  {[]} numbers
 * @return {[]}
 */
function unique(numbers) {
  // sort them (in ASC order) so getting unique values is faster
  numbers.sort(function (a, b) {
    return a - b;
  });
  return _.uniq(numbers, true);
}

/**
 * add radios to the system
 * @param {[]} numbers
 * @returns {[]} any radios added (that weren't in the system before)
 */
function addRadios(numbers) {
  var added = [],
    // get the current radios
    currentRadios = listRadios();

  added = _.difference(numbers, currentRadios);
  // add the new radios to the current ones
  currentRadios = currentRadios.concat(numbers);
  currentRadios = unique(currentRadios);
  // write them to radios.json
  data.write(radioPath, currentRadios);
  return unique(added);
}

/**
 * remove radios from the system
 * @param  {[]} numbers
 * @return {[]} any radios removed (that WERE in the system before)
 */
function removeRadios(numbers) {
  var removed = [],
    // get the current radios
    currentRadios = listRadios();

  // get the removed radios
  removed = _.intersection(currentRadios, numbers);
  // remove the new radios from the current ones
  // note: if new radio isn't in the current radios, it doesn't care
  // so you could do [1,2,3] -> remove [2,3,4] and get [1] back
  currentRadios = _.difference(currentRadios, numbers);
  currentRadios = unique(currentRadios);
  // write them to radios.json
  data.write(radioPath, currentRadios);
  return unique(removed);
}

/**
 * see if a radio exists in our system
 * @param  {string} radionum
 * @return {Bool}
 */
function exists(radionum) {
  var radios = listRadios(),
    num = parseInt(radionum);

  return !!(radios.length && _.contains(radios, num));
}

exports.list = listRadios;
exports.add = addRadios;
exports.remove = removeRadios;
exports.exists = exists;