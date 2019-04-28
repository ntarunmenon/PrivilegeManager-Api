const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
var _ = require('lodash');

async function getEmployees() {
    return JSON.parse(await readFile('json/employees.json'))
}

async function updateEmployee(employee) {
  var employees =  await getEmployees()
  var index = _.findIndex(employees, {'mntEmpId': employee.mntEmpId})
  if (index === -1) {
      employees.push(employee)
  } else {
      employees.splice(index,1,employee)
  }
  return writeFile('json/employees.json',JSON.stringify(employees,null,2))
 }

async function deleteEmployee(mntEmpId) {
    var employees =  await getEmployees()
    _.remove(employees, (employee) => employee.mntEmpId === mntEmpId)
    return writeFile('json/employees.json',JSON.stringify(employees,null,2)) 
}

async function verifyUserNamePassword(userName,password) {
    var employees =  await getEmployees()
    const employee = employees.find((employee) => 
        employee.empCode === userName && employee.password === password
    )
    return employee 
}


exports.getEmployees = getEmployees;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee
exports.verifyUserNamePassword = verifyUserNamePassword