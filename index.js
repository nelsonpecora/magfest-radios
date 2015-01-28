/**
 * Module dependencies.
 */

var program = require('commander'),
  pkg = require('./package.json');

program
  .version(pkg.version)
  .option('-t, --test', 'Test if things are running')
  .parse(process.argv);

console.log('radio script running...');
if (program.test) {
  console.log('testing radio script... ');
  console.log('tests pass!');
}