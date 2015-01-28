#!/usr/bin/env node
'use strict';

var program = require('commander'),
  pkg = require('./package.json'),
  checkRadios = require('./lib/check-radios');

program
  .version(pkg.version)
  .option('-a, --add <items>', 'Add radios, e.g. 1-10 or 12,13')
  .option('-r, --remove <items>', 'Remove radios, e.g. 3,4 or 1-6')
  .parse(process.argv);

checkRadios(program);