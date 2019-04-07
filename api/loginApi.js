'use strict';
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const jwtBearerToken = jwt.sign({}, 'secret123', {
        algorithm: 'HS256',
        expiresIn: 300,
        subject: JSON.stringify({
          username: 'john',
          roles : ['officer'] 
        })
    })

    res.status(200).json({
        username: 'john',
        roles : ['officer'],
        idToken: jwtBearerToken
      }
    );
})

module.exports = router