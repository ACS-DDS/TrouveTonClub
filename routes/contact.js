var express = require('express')
var session = require('express-session')
var router = express.Router()

/* GET Home page. */
router.get('/', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  res.render('contact', {
    title: 'Trouve Ton Club',
    auth: sess.authenticated || false,
    isadmin: sess.isadmin || false
  })
})

router.post('/', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  res.redirect('/')
})

module.exports = router
