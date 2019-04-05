const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
var _ = require('lodash');

async function getEmployees() {
    return await readFile('json/employees.json');
}

async function updateEmployee(employee) {
    getEmployees()
        .then (employees => {
            employeesJSON = JSON.parse(employees)
            var index = _.findIndex(employeesJSON, {'mntEmpId': employee.mntEmpId})
            if (index === -1) {
                employeesJSON.push(employee)
            } else {
                employeesJSON.splice(index,1,employee)
            }
            return writeFile('json/employees.json',JSON.stringify(employeesJSON,null,2))
        })    
}

async function deleteEmployee(mntEmpId) {
    getEmployees()
        .then (employees => {
            employeesJSON = JSON.parse(employees)
            _.remove(employeesJSON, (employee) => employee.mntEmpId === mntEmpId)
            return writeFile('json/employees.json',JSON.stringify(employeesJSON,null,2))
        })    
}

exports.getEmployees = getEmployees;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee