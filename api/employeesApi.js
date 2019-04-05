'use strict';
var express = require('express')
var router = express.Router()
const { getEmployees } = require("./../file/employeesFile");

router.get('/', (req, res) => {
     getEmployees()
    .then(employees => res.send(employees))
})



module.exports = router