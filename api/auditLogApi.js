'use strict';

const { getAuditLogs } = require("./../file/auditLogFile");

var express = require('express')
var router = express.Router()



router.get('/', async (req, res) => res.json(await getAuditLogs()))

module.exports = router
