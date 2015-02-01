'use strict';
var inquirer = require('inquirer'),
  chalk = require('chalk');

function showList(cb) {

  var questions = [{
      type: 'input',
      name:'radionum',
      message: 'Radio Number:',
      validate: function (input) {
        return input !== ''; // can't be blank
        // todo: check if this radio is already checked in
      }
    }];

  console.log('Checkin Radio\n');
  inquirer.prompt(questions, function (answers) {
    console.log(chalk.green('Radio #' + answers.radionum + ' checked in.'));
    if (answers.notes && answers.notes.length) {
      console.log('Notes: ' + answers.notes);
    }
    cb();
  });
}

module.exports = showList;