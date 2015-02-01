'use strict';
var fs = require('fs');

/**
 * get the log filename based on the date
 * @return {string} "data/tmp/YYYY-MM-DD.log"
 */
function getFileName() {
  var date = new Date(),
    year = date.getFullYear().toString(),
    month = (date.getMonth() + 1).toString(), // getMonth() is zero-based
    day = date.getDate().toString(),
    parsedDate;

  // prepend 0 to single digit month/day
  if (parseInt(month) < 10) {
    month = '0' + month;
  }
  if (parseInt(day) < 10) {
    day = '0' + day;
  }

  parsedDate = year + '-' + month + '-' + day;

  return 'data/tmp/' + parsedDate + '.log';
}

/**
 * write to the logfile
 * @param  {string} string message to write
 */
function writeLog(string) {
  var file = getFileName();

  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, string);
  } else {
    fs.appendFileSync(file, string);
  }
}

/**
 * get the timestamp
 * @return {string} "HH:MM"
 */
function getTime() {
  var date = new Date(),
    hms = date.toTimeString().split(' ')[0], // HH:MM:SS
    hhmm = hms.substr(0, 5); // cut off ":SS"

  return hhmm + '| '; // add some formatting to the end
}

/**
 * format checkout logs
 * @param  {string} radio number
 * @param  {string} name
 * @param  {string} dept
 */
function checkout(radio, name, dept) {
  var timestamp = getTime(),
    string = timestamp + '#' + radio + ' checked out to ' + name + ' from ' + dept + '\n';
  
  writeLog(string);
}

/**
 * format checkin logs
 * @param  {string} radio number
 */
function checkin(radio) {
  var timestamp = getTime(),
    string = timestamp + '#' + radio + ' checked in\n';
  
  writeLog(string);
}

/**
 * format a generic log entry
 * @param  {string} string
 */
function log(string) {
  var timestamp = getTime();
  
  writeLog(timestamp + string + '\n');
}

exports.checkout = checkout;
exports.checkin = checkin;
exports.log = log;