'use strict';
var express = require('express')
const uuidv1 = require('uuid/v1');
const moment = require('moment')
var router = express.Router()
const { getEmployees,updateEmployee, deleteEmployee } = require("./../file/employeesFile");
const { getLocations } = require("./../file/locationFile");
const _ = require('lodash');

router.get('/', (req, res) => {
     getEmployees()
     .then(employees => res.json(employees))
})

router.post('/', (req, res) => {
    var newEmployee = req.body;
    if (!'mntEmpId' in req.body) {
        newEmployee.mntEmpId = uuidv1()
        newEmployee.isActive = "Y"
        newEmployee.password = "pass1234"
    }
    newEmployee.enabled = true
    newEmployee.accountNonLocked = true
    newEmployee.accountNonExpired = true
    newEmployee.credentialsNonExpired = true
    newEmployee.createDate = moment().format('YYYY-MM-DD')
    newEmployee.modifiedDate = moment().format('YYYY-MM-DD')
    newEmployee.srvEmpRoleList = []
    var index = 0;
    for (var role of newEmployee.roles) {
        newEmployee.srvEmpRoleList[index] = {}
        newEmployee.srvEmpRoleList[index].roleId = _.cloneDeep(role)
        newEmployee.srvEmpRoleList[index].empRoleId = uuidv1()
        index++
    }
    delete newEmployee.role
    getLocations().then(locations => {
        newEmployee.empLocationId = (JSON.parse(locations))[0]
    })
    updateEmployee(newEmployee)
   .then(res.send(newEmployee.mntEmpId))
})

router.delete('/', (req, res) => {
    var mntEmpId = req.query.q;
    deleteEmployee(mntEmpId)
   .then(res.send(mntEmpId))
})

router.patch('/', (req, res) => {
    var patchJson = req.body;
    if (patchJson.actionType === 'ResetPassword') {
        getEmployees()
        .then(employees => {
            var index = _.findIndex(employees, {'mntEmpId': patchJson.mntEmpId})
            employees[index].password = "pass1234" 
            return employees[index]          
        })
        .then(employee => updateEmployee(employee))
        .then(res.send(patchJson.mntEmpId))
    }
    
})

module.exports = router