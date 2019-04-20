const express = require('express')
var auditLog = require('./api/auditLogApi')
var employees = require('./api/employeesApi')
var locations = require('./api/locationApi')
var login = require('./api/loginApi')
var bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/api/auditlogs', auditLog)
app.use('/api/employees', employees)
app.use('/api/locations', locations)
app.use('/api/login', login)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

