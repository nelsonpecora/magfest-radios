#!/usr/bin/env node
'use strict';

var program = require('commander'),
  pkg = require('./package.json'),
  chalk = require('chalk'),
  addRemove = require('./lib/add-remove'),
  mainScreen = require('./lib/main-screen');

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
  .option('-r, --remove <items>', 'Remove radios, e.g. 3,4 or 1-6');

program.parse(process.argv);

if (program.add || program.remove) {
  // see if they want to modify radios
  addRemove(program);
} else {
  showTitle();
  // ok, start the actual program
  mainScreen();
}