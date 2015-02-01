'use strict';

var inquirer = require('inquirer'),
  chalk = require('chalk'),
  fs = require('fs'),
  // submenus
  checkout = require('./checkout'),
  checkin = require('./checkin'),
  find = require('./find'),
  list = require('./list'),
  stats = require('./stats');

function checkIfRadioDataExists() {
  // if there are no radios in the system, we can't check any out
  if (!fs.existsSync('data/tmp/radios.json')) {
    console.log(chalk.red('ERROR: No radios in the system!'));
    console.log(chalk.red('Add new radios with `./radio -a [num]` or `./radio --add [num]`'));
    process.exit(1);
  } else {
    return true;
  }
}

function showMainMenu() {
  checkIfRadioDataExists();
  console.log(chalk.grey('\n##################\n'));

  var question = {
    type: 'list',
    name:'main',
    message: 'Main Menu',
    choices: ['Checkout', 'Checkin', new inquirer.Separator(), 'Find Radio', 'List Radios', new inquirer.Separator(), 'Show Stats']
  };

  inquirer.prompt([question], function (answers) {
    switch (answers.main) {
      case 'Checkout': 
        checkout(showMainMenu);
        break;
      case 'Checkin':
        checkin(showMainMenu);
        break;
      case 'Find Radio':
        find(showMainMenu);
        break;
      case 'List Radios':
        list(showMainMenu);
        break;
      case 'Show Stats':
        stats(showMainMenu);
        break;
    }
  });
}

module.exports = showMainMenu;