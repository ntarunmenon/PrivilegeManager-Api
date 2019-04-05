const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function getEmployees() {
    return await readFile('json/employees.json')
}

exports.getEmployees = getEmployees;