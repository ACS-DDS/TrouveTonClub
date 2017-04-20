var express = require('express')
var session = require('express-session')
var pg = require('pg')
var router = express.Router()
var dbconn = process.env.DATABASE_URL || 'postgresdatabase'

/* GET home page. */
router.get('/:id', function (req, res, next) {
  var sess = req.session
  console.log(sess)

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
      res.render('descrip', {
        title: 'Trouve Ton Club',
        data: result,
        auth: sess.authenticated || false,
        isadmin: sess.isadmin || false
      })
    })
  })
})

module.exports = router
