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
    getEmployees()
    .then(employees => { 
        var index = _.findIndex(employees, {'mntEmpId': req.body.mntEmpId})
        var employeetoUpdate
        if(index != -1) {
            employeetoUpdate = employees.slice(index,index + 1)[0]
        } else {
            employeetoUpdate = req.body
            employeetoUpdate.mntEmpId = uuidv1()
            employeetoUpdate.isActive = "Y"
            employeetoUpdate.password = "pass1234"
            employeetoUpdate.accountNonLocked = true
            employeetoUpdate.accountNonExpired = true
            employeetoUpdate.credentialsNonExpired = true
            employeetoUpdate.createDate = moment().format('YYYY-MM-DD')
        }
        if (!'enabled' in req.body){
            employeetoUpdate.enabled = true
        } else {
            employeetoUpdate.enabled = req.body.enabled
        }
        employeetoUpdate.modifiedDate = moment().format('YYYY-MM-DD')
        employeetoUpdate.srvEmpRoleList = []
        var index = 0;
        for (var role of req.body.roles) {
            employeetoUpdate.srvEmpRoleList[index] = {}
            employeetoUpdate.srvEmpRoleList[index].roleId = _.cloneDeep(role)
            employeetoUpdate.srvEmpRoleList[index].empRoleId = uuidv1()
            index++
        }
        delete employeetoUpdate.role
        return getLocations().then(locations => {
            employeetoUpdate.empLocationId = (JSON.parse(locations))[0]
            return employeetoUpdate
        })
    })
       .then(employeetoUpdate => updateEmployee(employeetoUpdate))
       .then(employeetoUpdate => res.send(employeetoUpdate.mntEmpId))
   
    
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