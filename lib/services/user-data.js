'use strict';

var _ = require('lodash'),
  phoneFormatter = require('phone-formatter'),
  data = require('./data'),
  userPath = 'data/tmp/users.json';

/**
 * find users, defaults to name
 * @param  {string} match thing to match by
 * @param  {string} [prop]   name, phone, badge (defaults to name)
 * @return {{}} user obj
 */
function find(match, prop) {
  var users = data.read(userPath),
    searchObj = {};

  // default to name if no prop specified
  prop = prop || 'name';

  // normalize phone numbers for better searching
  if (prop === 'phone') {
    match = phoneFormatter.normalize(match);
  }

  // build the search obj
  searchObj[prop] = match;

  return _.find(users, searchObj);
}

/**
 * see if a user exists in the system
 * @param  {string} name
 * @return {Bool}
 */
function exists(name) {
  return !!(find(name));
}

/**
 * add a user to the system
 * note: this doesn't check if a user already exists
 * @param {{}} answers from checkout questions
 */
function addUser(answers) {
  var name = answers.name,
    phone = answers.phone,
    badge = answers.badge,
    users = data.read(userPath),
    user = {
      name: name,
      phone: phoneFormatter.normalize(phone),
      badge: badge
    };

    // add it to the users list
    users.push(user);

    // write that back to json
    data.write(userPath, users);
}

exports.find = find;
exports.exists = exists;
exports.add = addUser;