'use strict';
var express = require('express')
const uuidv1 = require('uuid/v1');
const moment = require('moment')
var router = express.Router()
const { getEmployees,updateEmployee, deleteEmployee } = require("./../file/employeesFile");
const { getLocations } = require("./../file/locationFile");
const _ = require('lodash');
const auth = require('../middleware/auth')

router.use(auth)

router.get('/', async (req, res) => res.json(await getEmployees()))

router.post('/', async (req, res) => {
    var employees = await getEmployees()
    var index = _.findIndex(employees, {'mntEmpId': req.body.mntEmpId})
    var employeetoUpdate
    if(index != -1) {
        employeetoUpdate = employees.slice(index,index + 1)[0]
    } else {
        employeetoUpdate = {};
        employeetoUpdate.mntEmpId = uuidv1()
        employeetoUpdate.isActive = "Y"
        employeetoUpdate.password = "pass1234"
        employeetoUpdate.accountNonLocked = true
        employeetoUpdate.accountNonExpired = true
        employeetoUpdate.credentialsNonExpired = true
        employeetoUpdate.createDate = moment().format('YYYY-MM-DD')
        employeetoUpdate.enabled = true
    }
    employeetoUpdate.empNameEn = req.body.empNameEn
    employeetoUpdate.empNameAr = req.body.empNameAr
    employeetoUpdate.empGprNo = req.body.empGprNo
    employeetoUpdate.empCode = req.body.empCode
    employeetoUpdate.empTelNo = req.body.empTelNo
    employeetoUpdate.empEmail = req.body.empEmail
    employeetoUpdate.isActive = req.body.isActive
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
    const locations = await getLocations()
    employeetoUpdate.empLocationId = (locations)[0]
    await updateEmployee(employeetoUpdate)
    res.send(employeetoUpdate.mntEmpId)
})

router.delete('/', async (req, res) => {
    var mntEmpId = req.query.q;
    await deleteEmployee(mntEmpId)
    res.send(mntEmpId)
})

router.patch('/', async (req, res) => {
    var patchJson = req.body;
    if (patchJson.actionType === 'ResetPassword') {
        const employees = await getEmployees()
        var index = _.findIndex(employees, {'mntEmpId': patchJson.mntEmpId})
        employees[index].password = "pass1234"  
        await updateEmployee(employees[index])
        res.send(patchJson.mntEmpId)
    }
})

module.exports = router