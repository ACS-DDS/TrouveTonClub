var express = require('express')
var session = require('express-session')
var paginate = require('express-paginate')
var pg = require('pg')
var router = express.Router()
var dbconn = process.env.DATABASE_URL || 'postgresdatabase'

/* GET home page. */
router.post('/', function (req, res, next) {
  var sess = req.session

  if (req.body.search) {
    if (sess.search = req.body.search) {
      console.log(sess)
      var result = []
      pg.connect(dbconn, (err, client, done) => {
        if (err) {
          done()
          console.log(err)
          return res.status(500).json({success: false, data: err})
        }
        var query = client.query("SELECT * FROM data WHERE deplib LIKE '%' || ($1) || '%' OR insnom LIKE '%' || ($1) || '%' ORDER BY id ASC LIMIT 10;", [req.body.search])
        query.on('row', (row) => {
          result.push(row)
        })
        query.on('end', () => {
          done()
          res.render('liste', {
            title: 'Trouve Ton Club',
            data: result,
            search: sess.search,
            auth: sess.authenticated || false,
            isadmin: sess.isadmin || false
          })
        })
      })
    };
  };
})

router.get('/:pagenum', function (req, res, next) {
  var sess = req.session
  console.log(req.params.pagenum)

  if (sess.search) {
    console.log(sess)
    var result = []
    pg.connect(dbconn, (err, client, done) => {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }
      var query = client.query("SELECT * FROM data WHERE deplib LIKE '%' || ($1) || '%' OR insnom LIKE '%' || ($1) || '%' ORDER BY id ASC LIMIT 10 OFFSET ($2) 0;", [sess.search, req.params.pagenum])
      query.on('row', (row) => {
        result.push(row)
      })
      query.on('end', () => {
        done()
        res.render('liste', {
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
