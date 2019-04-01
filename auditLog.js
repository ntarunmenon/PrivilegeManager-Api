'use strict';
var express = require('express')
var router = express.Router()
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile)


async function getAuditLogs() {
    return await readFile('json/auditLog.json')
}

router.get('/', (req, res) => {
     getAuditLogs()
    .then(auditLogs => res.send(auditLogs))
})

module.exports = router
