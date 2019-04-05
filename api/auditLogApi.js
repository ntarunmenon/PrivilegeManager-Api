'use strict';

const { getAuditLogs } = require("./../file/auditLogFile");

var express = require('express')
var router = express.Router()



router.get('/', (req, res) => {
     getAuditLogs()
    .then(auditLogs => res.send(auditLogs))
})

module.exports = router
