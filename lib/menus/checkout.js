'use strict';
var inquirer = require('inquirer'),
  chalk = require('chalk'),
  logger = require('../services/logger');

function showCheckout(cb) {
  var questions = [{
      type: 'input',
      name:'radionum',
      message: 'Radio Number:',
      validate: function (input) {
        return input !== ''; // can't be blank
        // todo: check if this radio is already checked out
      }
    }, {
      type: 'input',
      name:'name',
      message: 'Name:',
      validate: function (input) {
        return input !== ''; // can't be blank
      }
    }, {
      type: 'input',
      name:'dept',
      message: 'Department:',
      validate: function (input) {
        return input !== ''; // can't be blank
      }
    }, {
      type: 'input',
      name:'phone',
      message: 'Phone Number:',
      validate: function (input) {
        var pass = input.match(/\d+/); // literally just see if it has at least one number in it
        if (pass) {
          return true;
        } else {
          return 'Please enter a valid phone number';
        }
      }
    }, {
      type: 'input',
      name:'badge',
      message: 'Badge Number:',
      validate: function (input) {
        return input !== ''; // can't be blank
      }
    }];

  console.log('Checkout Radio\n');
  inquirer.prompt(questions, function (answers) {
    logger.checkout(answers.radionum, answers.name, answers.dept);
    console.log(chalk.green('Radio #' + answers.radionum + ' checked out to ' + answers.name + ' (' + answers.dept + ').'));
    cb();
  });
}

module.exports = showCheckout;