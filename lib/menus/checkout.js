'use strict';
var inquirer = require('inquirer'),
  chalk = require('chalk'),
  radioData = require('../services/radio-data'),
  userData = require('../services/user-data'),
  logger = require('../services/logger');

/**
 * determine when we have to enter in more user data
 * @param  {{}} answers current answer hash
 * @return {Bool}         
 */
function userDoesntExist(answers) {
  var name = answers.name;
  return !userData.exists(name);
}

function showCheckout(cb) {
  var questions = [{
      type: 'input',
      name:'radionum',
      message: 'Radio Number:',
      validate: function (input) {
        if (input === '') {
          // radio cannot be blank
          return false;
        } else if (!radioData.exists(input)) {
          // radio must exist in the system
          return 'Radio #' + input + ' is not in the system!';
        } else {
          return true;
        }
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
      },
      when: userDoesntExist
    }, {
      type: 'input',
      name:'badge',
      message: 'Badge Number:',
      validate: function (input) {
        return input !== ''; // can't be blank
      },
      when: userDoesntExist
    }];

  console.log('Checkout Radio\n');
  inquirer.prompt(questions, function (answers) {
    logger.checkout(answers.radionum, answers.name, answers.dept);
    console.log(chalk.green('Radio #' + answers.radionum + ' checked out to ' + answers.name + ' (' + answers.dept + ').'));

    // add the user if they don't exist in the system yet
    if (userDoesntExist(answers)) {
      userData.add(answers);
    }

    cb();
  });
}

module.exports = showCheckout;