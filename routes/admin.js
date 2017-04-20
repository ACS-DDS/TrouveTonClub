var express = require('express')
var session = require('express-session')
var pg = require('pg')
var router = express.Router()
var dbconn = process.env.DATABASE_URL || 'postgresdatabase'

/* GET users listing. */
router.get('/', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (sess.authenticated && sess.isadmin) {
    res.render('admin/index', {
      title: 'Trouve Ton Club',
      auth: sess.authenticated || false,
      isadmin: sess.isadmin || false
    })
  } else {
    res.redirect('/')
  }
})

router.get('/:page', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (sess.authenticated && sess.isadmin) {
    res.render('admin/' + req.params.page, {
      title: 'Trouve Ton Club',
      auth: sess.authenticated || false,
      isadmin: sess.isadmin || false
    })
  } else {
    res.redirect('/')
  }
})

router.get('/data/list', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (sess.authenticated && sess.isadmin) {
    var result = []
    pg.connect(dbconn, (err, client, done) => {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }
      var query = client.query('SELECT * FROM data ORDER BY id ASC LIMIT 10;')
      query.on('row', (row) => {
        result.push(row)
      })
      query.on('end', () => {
        done()
        res.render('admin/data/list', {
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

router.get('/data/edit/:id', function (req, res, next) {
  var sess = req.session
  console.log(sess)

  if (sess.authenticated && sess.isadmin) {
    var result = []
    pg.connect(dbconn, (err, client, done) => {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }
      var query = client.query('SELECT * FROM data WHERE id=($1) ORDER BY id ASC;', [req.params.id])
      query.on('row', (row) => {
        result.push(row)
      })
      query.on('end', () => {
        done()
        res.render('admin/data/edit', {
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

module.exports = router
