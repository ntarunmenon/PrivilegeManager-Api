const express = require('express')
var auditLog = require('./api/auditLogApi')
var employees = require('./api/employeesApi')

const app = express()
const port = 3000

app.use('/auditLogs', auditLog)
app.use('/employees', employees)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

