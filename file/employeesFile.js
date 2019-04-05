const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function getEmployees() {
    return await readFile('json/employees.json');
}

async function updateEmployee(employee) {
    getEmployees()
        .then (employees => {
            employeesJSON = JSON.parse(employees)
            employeesJSON.push(employee)
            return writeFile('json/employees.json',JSON.stringify(employeesJSON,null,2))
        })    
}

exports.getEmployees = getEmployees;
exports.updateEmployee = updateEmployee;