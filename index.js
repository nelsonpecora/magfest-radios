#!/usr/bin/env node
'use strict';

var program = require('commander'),
  pkg = require('./package.json'),
  chalk = require('chalk'),
  addRemove = require('./lib/services/add-remove'),
  radioData = require('./lib/services/radio-data'),
  mainScreen = require('./lib/menus/main-screen');

function showTitle() {
  console.log(chalk.green(
    ' __  __   _    ____ _____ _____ ____ _____ \n' +
    '|  \/  |  / \\  / ___|  ___| ____/ ___|_   _|\n' +
    '| |\/| | / _ \\| |  _| |_  |  _| \\___ \\ | |  \n' +
    '| | | |/ ___ \\ |_| |  _| | |___ ___) || |  \n' +
    '|_| |_/_/   \\_\\____|_|   |_____|____/ |_|  \n' +
    ' ____      _    ____ ___ ___                \n' +
    '|  _ \\    / \\  |  _ \\_ _/ _ \\               \n' +
    '| |_) |  / _ \\ | | | | | | | |              \n' +
    '|  _ <  / ___ \\| |_| | | |_| |              \n' +
    '|_| \\_\\/_/   \\_\\____/___\\___/               \n' +
    ' ______   ______ _____ _____ __  __         \n' +
    '/ ___\\ \\ / / ___|_   _| ____|  \\/  |        \n' +
    '\\___  \\ V /\\___ \\ | | |  _| | |\\/| |        \n' +
    ' ___) || |  ___) || | | |___| |  | |        \n' +
    '|____/ |_| |____/ |_| |_____|_|  |_|       \n'
    ));
}

program
  .version(pkg.version)
  .option('-a, --add <items>', 'Add radios, e.g. 1-10 or 12,13')
  .option('-r, --remove <items>', 'Remove radios, e.g. 3,4 or 1-6')
  .option('-l, --list', 'List all radios currently in the system');

program.parse(process.argv);

if (program.list) {
  // just list the radios currently in the system, then exit
  let radios = radioData.readRadios();

  if (radios.length === 0) {
    console.log('There are currently ' + chalk.red(radios.length) + ' radios in the system.');
  } else if (radios.length === 1) {
    console.log('There is currently ' + chalk.yellow(radios.length) + ' radio in the system.');
    console.log('Number: ' + radios.join(' '));
  } else {
    console.log('There are currently ' + chalk.yellow(radios.length) + ' radios in the system.');
    console.log('Numbers: ' + radios.join(' '));
  }
} else if (program.add || program.remove) {
  // see if they want to modify radios
  addRemove(program);
} else {
  showTitle();
  // ok, start the actual program
  mainScreen();
}