'use strict';

var nodeRange = require('node-range'),
  chalk = require('chalk'),
  prompt = require('prompt');

function list(val) {
  return val.split(',').map(Number);
}

function range(val) {
  var split = val.split('-'),
    ret = nodeRange(split[0], split[1]).toArray().map(Number);
  ret.push(parseInt(split[1])); // only needed until range can do inclusive arrays: https://github.com/miketheprogrammer/node-range/pull/1
  return ret;
}

/**
 * parse ranges, e.g. 1-10,12,14
 * @param  {string} val
 * @return {[]}       list of all the numbers
 */
function parseNumbers(val) {
  var isList = val.match(/(\d+,)+\d+/), // e.g. 2,3 or 12,13,14
    isRange = val.match(/\d+-\d+/),
    isNum = val.match(/^\d+$/);

  if (isList && !isRange) { // match lists, 2,3,4
    return list(val);
  } else if (isRange && !isList) { // match ranges, 2-4
    return range(val);
  } else if (isNum) { // match single numbers, 2
    return [parseInt(val)]; // put it in an array by itself
  } else { // errors on mixed things like 2,3-5
    console.error(chalk.red('✘') + ' Argument must be in the form of ' + chalk.yellow('1-10') + ' OR ' + chalk.yellow('3,4,5') + '!');
    process.exit(1);
  }
}

module.exports = function (program) {
  // adding radios
  if (program.add) {
    let numbers = parseNumbers(program.add);
    console.log('added radios: ' + chalk.yellow(numbers));
    process.exist(0);
  }

  // removing radios (note: you can do this at the same time as adding radios, but it will happen afterwards)
  // e.g. `./radio -a 1-5 -r 2-4` -> radios 1 and 5 will be added
  if (program.remove) {
    let numbers = parseNumbers(program.remove),
      schema = {
        properties: {
          confirm: {
            description: 'Confirm? (y/n)'
          }
        }
      };

    console.log(' ');
    console.log(chalk.red('PERMANENTLY REMOVING RADIOS: ' + numbers + ' '));
    prompt.start();

    prompt.get(schema, function (err, result) {
      var c = result && result.confirm;

      if (c && c.toLowerCase() === 'y' || c.toLowerCase() === 'yes') {
        console.log('removed radios: ' + numbers);
        process.exist(0);
      } else {
        console.log('no radios removed.');
        process.exist(0);
      }
    });
  }
};