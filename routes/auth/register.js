var express = require('express')
var session = require('express-session')
var pg = require('pg')
var bcrypt = require('bcrypt-nodejs')
var router = express.Router()
var dbconn = process.env.DATABASE_URL || 'postgresdatabase'

/* GET users listing. */
router.post('/', function (req, res) {
  var sess = req.session
  console.log(sess)

  if (!sess.authenticated) {
    if (req.body.username && req.body.email && req.body.password && req.body.password_confirm) {
      if (req.body.password_confirm === req.body.password) {
        pg.connect(dbconn, (err, client, done) => {
          if (err) {
            done()
            console.log(err)
            return res.status(500).json({success: false, data: err})
          }
          client.query('INSERT INTO users(username, email, password, created_at) VALUES ($1, $2, $3, $4);', [req.body.username, req.body.email, bcrypt.hashSync(req.body.password), Date.now()])
          res.redirect('/login')
        })
      }
    }
  } else {
    res.redirect('/')
  }
})

module.exports = router
