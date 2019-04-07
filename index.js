const express = require('express')
var auditLog = require('./api/auditLogApi')
var employees = require('./api/employeesApi')
var locations = require('./api/locationApi')
var login = require('./api/loginApi')
var bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/auditLogs', auditLog)
app.use('/employees', employees)
app.use('/locations', locations)
app.use('/login', login)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

