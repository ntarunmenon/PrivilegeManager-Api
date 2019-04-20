'use strict';
var express = require('express')
const uuidv1 = require('uuid/v1');
const moment = require('moment')
var router = express.Router()
const { getEmployees,updateEmployee, deleteEmployee } = require("./../file/employeesFile");
const { getLocations } = require("./../file/locationFile");

router.get('/', (req, res) => {
     getEmployees()
    .then(employees => res.json(JSON.parse(employees)))
})

router.post('/', (req, res) => {
    var newEmployee = req.body;
    newEmployee.mntEmpId = uuidv1()
    newEmployee.isActive = "Y"
    newEmployee.password = "pass1234"
    newEmployee.enabled = true
    newEmployee.accountNonLocked = true
    newEmployee.accountNonExpired = true
    newEmployee.credentialsNonExpired = true
    newEmployee.createDate = moment().format('YYYY-MM-DD')
    newEmployee.modifiedDate = moment().format('YYYY-MM-DD')
    newEmployee.srvEmpRoleList = []
    for (employeePrivelege of newEmployee.employeePriveleges) {
        newEmployee.srvEmpRoleList.push(_.cloneDeep(employeePrivelege))
        newEmployee.srvEmpRoleList.empRoleId = uuidv1()
    }
    newEmployee.empLocationId = getLocations().then(locations => {return locations[0]})
    updateEmployee(newEmployee)
   .then(res.send(newEmployee.mntEmpId))
})

router.put('/', (req, res) => {
    var newEmployee = req.body;
    newEmployee.modifiedDate = moment().format('YYYY-MM-DD')
    updateEmployee(newEmployee)
   .then(res.send(newEmployee.mntEmpId))
})

router.delete('/', (req, res) => {
    var mntEmpId = req.query.q;
    deleteEmployee(mntEmpId)
   .then(res.send(mntEmpId))
})

module.exports = router