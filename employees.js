'use strict';
var express = require('express')
var router = express.Router()
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile)

async function getEmployees() {
    return await readFile('json/employees.json')
}

router.get('/', (req, res) => {
     getEmployees()
    .then(employees => res.send(employees))
})

module.exports = router