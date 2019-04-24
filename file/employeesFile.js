const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
var _ = require('lodash');

async function getEmployees() {
    return await readFile('json/employees.json')
    .then(employees => JSON.parse(employees))
}

async function updateEmployee(employee) {
    getEmployees()
        .then (employees => {
            var index = _.findIndex(employees, {'mntEmpId': employee.mntEmpId})
            if (index === -1) {
                employees.push(employee)
            } else {
                employees.splice(index,1,employee)
            }
            return writeFile('json/employees.json',JSON.stringify(employees,null,2))
            .then (() => employee)
            return employee
        })   
}

async function deleteEmployee(mntEmpId) {
    getEmployees()
        .then (employeesJSON => {
            _.remove(employeesJSON, (employee) => employee.mntEmpId === mntEmpId)
            return writeFile('json/employees.json',JSON.stringify(employeesJSON,null,2))
        })    
}

async function verifyUserNamePassword(userName,password) {
    return getEmployees()
        .then (employees => {
           const employee = employees.find((employee) => employee.empCode === userName 
            && employee.password === password)
            return employee
        })    
}


exports.getEmployees = getEmployees;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee
exports.verifyUserNamePassword = verifyUserNamePassword