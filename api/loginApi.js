'use strict';
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { verifyUserNamePassword } = require("./../file/employeesFile");
const _ = require('lodash');

router.post('/', (req, res) => {
  var login = req.body;

  verifyUserNamePassword(login.user, login.password)
    .then(matchedEmployee => {
      const roles = _.get(matchedEmployee, "srvEmpRoleList", [])
        .map(item => item.roleId.roleName)

      if (matchedEmployee != null) {
        const jwtBearerToken = jwt.sign({}, 'secret123', {
          algorithm: 'HS256',
          expiresIn: 300,
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
      } else {
        res.status(401).send("Invalid User Name/Password")
      }
    });


})
module.exports = router