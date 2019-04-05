const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function getAuditLogs() {
    return await readFile('json/auditLog.json');
}

exports.getAuditLogs = getAuditLogs;