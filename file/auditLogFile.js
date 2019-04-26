const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function getAuditLogs() {
    return JSON.parse(await readFile('json/auditLog.json'));
}
exports.getAuditLogs = getAuditLogs;