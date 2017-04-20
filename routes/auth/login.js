var express = require('express')
var session = require('express-session')
var pg = require('pg')
var bcrypt = require('bcrypt-nodejs')
var router = express.Router()
var dbconn = process.env.DATABASE_URL || 'postgresdatabase'

/* GET login page. */
router.post('/', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (!sess.authenticated) {
    if (req.body.username && req.body.password) {
      var result = []
      pg.connect(dbconn, (err, client, done) => {
        if (err) {
          done()
          console.log(err)
          return res.status(500).json({success: false, data: err})
        }
        var query = client.query('SELECT * FROM users WHERE username=($1) ORDER BY id ASC;', [req.body.username])
        query.on('row', (row) => {
          result.push(row)
        })
        query.on('end', () => {
          done()
          if (result.length > 0) {
            if (bcrypt.compareSync(req.body.password, result[0]['password'])) {
              sess.authenticated = true
              sess.user_id = result[0]['id']
              if (result[0]['rights']) {
                sess.isadmin = true
              }
              res.redirect('/')
            }
          } else {
            res.redirect('/login')
          }
        })
      })
    };
  } else {
    res.redirect('/')
  }
})

module.exports = router
