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
    var radios = radioData.readRadios(),
      num = parseInt(answers.radionum);

    if (!radios.length || !_.contains(radios, num)) {
      logger.log('tried to checkin #' + answers.radionum + ', not in the system');
      console.log(chalk.red('Radio #' + answers.radionum + ' is not in the system!'));
      cb();
    } else {
      logger.checkin(answers.radionum);
      console.log(chalk.green('Radio #' + answers.radionum + ' checked in.'));
      cb();
    }
  });
}

module.exports = showCheckin;