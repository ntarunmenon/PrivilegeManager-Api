'use strict';
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { verifyUserNamePassword } = require("./../file/employeesFile");
const _ = require('lodash');

router.post('/', async (req, res) => {
  var login = req.body;
  const matchedEmployee = await verifyUserNamePassword(login.user, login.password)
  const roles = _.get(matchedEmployee, "srvEmpRoleList", []).map(item => item.roleId.roleName)

  if (matchedEmployee == null) {
    res.status(401).send("Invalid User Name/Password")
  }

  const jwtBearerToken = jwt.sign({}, 'secret123', {
    algorithm: 'HS256',
    expiresIn: 60,
    subject: JSON.stringify({
      username: matchedEmployee.empCode,
      roles: roles
    })
  })

  res.status(200).json({
    username: matchedEmployee.empCode,
    roles: roles,
    idToken: jwtBearerToken
  }
  );
})

module.exports = router