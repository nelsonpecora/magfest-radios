'use strict';

var nodeRange = require('node-range'),
  chalk = require('chalk'),
  inquirer = require('inquirer'),
  radioData = require('./radio-data');

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
    numbers = radioData.add(numbers);
    if (numbers.length === 0) {
      console.log('radios have already been added');
    } else if (numbers.length === 1) {
      console.log('added radio: ' + chalk.yellow(numbers.join(' ')));
    } else {
      console.log('added radios: ' + chalk.yellow(numbers.join(' ')));
    }
    process.exit(0);
  }

  // removing radios (note: you can do this at the same time as adding radios, but it will happen afterwards)
  // e.g. `./radio -a 1-5 -r 2-4` -> radios 1 and 5 will be added
  if (program.remove) {
    let numbers = parseNumbers(program.remove),
      question = {
        type: 'confirm',
        name: 'confirm',
        message: chalk.red('PERMANENTLY REMOVE RADIOS: ' + program.remove + '?'),
        default: false
      };

    inquirer.prompt([question], function (answers) {
      if (answers && answers.confirm) {
        numbers = radioData.remove(numbers);
        if (numbers.length === 0) {
          console.log('radios have already been removed.');
        } else if (numbers.length === 1) {
          console.log('removed radio: ' + chalk.yellow(numbers.join(' ')));
        } else {
          console.log('removed radios: ' + chalk.yellow(numbers.join(' ')));
        }
        process.exit(0);
      } else {
        console.log('no radios removed.');
        process.exit(0);
      }
    });
  }
};