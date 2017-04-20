var express = require('express')
var session = require('express-session')
var pg = require('pg')
var bcrypt = require('bcrypt-nodejs')
var router = express.Router()
var dbconn = process.env.DATABASE_URL || 'postgresdatabase'

/* GET users listing. */
router.get('/', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (sess.authenticated) {
    var result = []
    pg.connect(dbconn, (err, client, done) => {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }
      var query = client.query('SELECT * FROM users WHERE id=($1) ORDER BY id ASC;', [sess.user_id])
      query.on('row', (row) => {
        result.push(row)
      })
      query.on('end', () => {
        done()
        res.render('profile/index', {
          title: 'Trouve Ton Club',
          data: result,
          auth: sess.authenticated || false,
          isadmin: sess.isadmin || false
        })
      })
    })
  } else {
    res.redirect('/')
  }
})

router.get('/edit', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (sess.authenticated) {
    var result = []
    pg.connect(dbconn, (err, client, done) => {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }
      var query = client.query('SELECT * FROM users WHERE id=($1) ORDER BY id ASC;', [sess.user_id])
      query.on('row', (row) => {
        result.push(row)
      })
      query.on('end', () => {
        done()
        res.render('profile/edit', {
          title: 'Trouve Ton Club',
          data: result,
          auth: sess.authenticated || false,
          isadmin: sess.isadmin || false
        })
      })
    })
  } else {
    res.redirect('/')
  }
})

router.post('/edit', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (sess.authenticated) {
    if (req.body.username && req.body.email && req.body.password && req.body.password_confirm) {
      if (req.body.password === req.body.password_confirm) {
        pg.connect(dbconn, (err, client, done) => {
          if (err) {
            done()
            console.log(err)
            return res.status(500).json({success: false, data: err})
          }
          client.query('UPDATE users SET username=$1, email=$2, password=$3, updated_at=$4 WHERE id=($5);', [req.body.username, req.body.email, bcrypt.hashSync(req.body.password), Date.now(), sess.user_id])
          res.redirect('/profile')
        })
      } else {
        res.redirect('/profile/edit')
      }
    } else {
      res.redirect('/profile/edit')
    }
  } else {
    res.redirect('/')
  }
})

module.exports = router
