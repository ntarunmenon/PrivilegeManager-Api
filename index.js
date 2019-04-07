const express = require('express')
var auditLog = require('./api/auditLogApi')
var employees = require('./api/employeesApi')
var locations = require('./api/locationApi')
var bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/auditLogs', auditLog)
app.use('/employees', employees)
app.use('/locations', locations)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

