var express = require('express')
var session = require('express-session')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  res.render('index', {
    title: 'Trouve Ton Club',
    auth: sess.authenticated || false,
    isadmin: sess.isadmin || false
  })
})

module.exports = router
