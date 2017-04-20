var express = require('express')
var session = require('express-session')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (sess.authenticated) {
    sess.destroy()
  }

  res.redirect('/')
})

module.exports = router
