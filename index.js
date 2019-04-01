const express = require('express')
var auditLog = require('./auditLog')
var employees = require('./employees')

const app = express()
const port = 3000

app.use('/auditLogs', auditLog)
app.use('/employees', employees)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

