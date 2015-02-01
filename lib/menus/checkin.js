'use strict';
var inquirer = require('inquirer'),
  chalk = require('chalk'),
  _ = require('lodash'),
  radioData = require('../services/radio-data'),
  logger = require('../services/logger');

function showCheckin(cb) {

  var questions = [{
      type: 'input',
      name:'radionum',
      message: 'Radio Number:',
      validate: function (input) {
        return input !== ''; // can't be blank
      }
    }];

  console.log('Checkin Radio\n');
  inquirer.prompt(questions, function (answers) {
    var radio = answers.radionum;

    if (!radioData.exists(radio)) {
      logger.log('tried to checkin #' + radio + ', not in the system');
      console.log(chalk.red('Radio #' + radio + ' is not in the system!'));
      cb();
    } else {
      logger.checkin(radio);
      console.log(chalk.green('Radio #' + radio + ' checked in.'));
      cb();
    }
  });
}

module.exports = showCheckin;