'use strict';

const { getAuditLogs } = require("./../file/auditLogFile");
const auth = require('../middleware/auth')


var express = require('express')
var router = express.Router()


router.use(auth)
router.get('/', async (req, res) => res.json(await getAuditLogs()))

module.exports = router
