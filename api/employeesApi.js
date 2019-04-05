'use strict';
var express = require('express')
const uuidv1 = require('uuid/v1');
const moment = require('moment')
var router = express.Router()
const { getEmployees,updateEmployee } = require("./../file/employeesFile");

router.get('/', (req, res) => {
     getEmployees()
    .then(employees => res.json(JSON.parse(employees)))
})

router.post('/', (req, res) => {
    var newEmployee = req.body;
    newEmployee.mntEmpId = uuidv1()
    newEmployee.createDate = moment().format('YYYY-MM-DD')
    newEmployee.modifiedDate = moment().format('YYYY-MM-DD')
    updateEmployee(newEmployee)
   .then(res.send(newEmployee.mntEmpId))
})

module.exports = router