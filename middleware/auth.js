const jwt = require('jsonwebtoken');

module.exports = function (req,res, next) {
    console.log('inside auth')
    const token = req.header('X-Auth-Token')
  if(!token) {
    console.log('denied')
    return res.status(401).send('No Token in request')
  }
    try {
    const decoded = jwt.verify (token, 'secret123')
    console.log(`${decoded}`)
    next()
    } catch (ex) {
      console.log('exception')  
      return res.status(401).send('Access denied')
    }
}