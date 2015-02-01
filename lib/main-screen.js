'use strict';

var inquirer = require('inquirer'),
  chalk = require('chalk'),
  fs = require('fs'),
  currMenu = 'main'; // yeah, it's a state. sue me.

function checkIfRadiosExist() {
  // if there are no radios in the system, we can't check any out
  if (!fs.existsSync('data/tmp/radios.json')) {
    console.log(chalk.red('ERROR: No radios in the system!'));
    console.log(chalk.red('Add new radios with `./radio -a [num]` or `./radio --add [num]`'));
    process.exit(1);
  } else {
    return true;
  }
}

function showCheckoutMenu() {
  currMenu = 'checkout';

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
    }, {
      type: 'input',
      name:'notes',
      message: 'Notes (optional):'
    }];

  console.log('Checkout Radio\n');
  inquirer.prompt(questions, function (answers) {
    console.log(chalk.green('Radio #' + answers.radionum + ' checked out to ' + answers.name + ' (' + answers.dept + ').'));
    if (answers.notes && answers.notes.length) {
      console.log('Notes: ' + answers.notes);
    }
    showMainMenu();
  });
}

function showCheckin() {
  currMenu = 'checkin';

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
    showMainMenu();
  });
}

function showMainMenu() {
  checkIfRadiosExist();
  
  if (currMenu !== 'main') {
    console.log(chalk.grey('\n\n##################\n'));
  }
  currMenu = 'main';

  var question = {
    type: 'list',
    name:'main',
    message: 'Main Menu',
    choices: ['Checkout', 'Checkin', new inquirer.Separator(), 'Find Radio', 'List Radios', new inquirer.Separator(), 'Show Stats']
  };

  inquirer.prompt([question], function (answers) {
    switch (answers.main) {
      case 'Checkout': 
        showCheckoutMenu();
        break;
      case 'Checkin':
        showCheckin();
        break;
      case 'Find Radio':
        showFindMenu();
        break;
      case 'List Radios':
        showList();
        break;
      case 'Show Stats':
        showStats();
        break;
    }
  });
}

module.exports = function () {
  // var stdin = process.openStdin();
  // require('tty').setRawMode(true);    

  // todo: add back functionality
  // stdin.on('keypress', function (chunk, key) {
  //   if (key && key.name === 'escape') {
  //     if (currMenu === 'checkout') {
  //       showMainMenu();
  //     }
  //   }
  // });

  showMainMenu();
};