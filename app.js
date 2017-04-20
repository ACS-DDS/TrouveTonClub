// libs
var express = require('express')
var session = require('express-session')
var paginate = require('express-paginate')
var bodyParser = require('body-parser')
var path = require('path')
var morgan = require('morgan')
var fs = require('fs')
var cookieParser = require('cookie-parser')
var helmet = require('helmet')
var errorhandler = require('errorhandler')
// var multer = require('multer')
var compression = require('compression')
// var csurf = require('csurf')
var flash = require('connect-flash')
var packagejson = require('./package.json')

// routing
var index = require('./routes/index')
var list = require('./routes/list')
var club = require('./routes/club')
var login = require('./routes/auth/login')
var register = require('./routes/auth/register')
var logout = require('./routes/auth/logout')
var profile = require('./routes/profile')
var admin = require('./routes/admin')
var contact = require('./routes/contact')

// apps
var app = express()
var log = fs.createWriteStream(path.join(__dirname, 'logs/' + (packagejson.name || 'access') + '.log'), {flags: 'a'})
// var upload = multer({dest: 'uploads/'})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// using settings
app.use(morgan('dev', {stream: log}))
app.use(helmet())
app.use(errorhandler())
app.use(compression())
app.use(cookieParser())
// app.use(csurf({cookie:true}));
app.use(flash())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(paginate.middleware(10, 50))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'NodeJS',
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

// routing
app.use('/', index)
app.use('/list', list)
app.use('/club', club)
app.use('/login', login)
app.use('/register', register)
app.use('/logout', logout)
app.use('/profile', profile)
app.use('/admin', admin)
app.use('/contact', contact)

// catch 404 and forward to error handler
// app.use(function(req,res,next){
//     var err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });

app.use(function (req, res, next) {
  var sess = req.session
  console.log(sess)

  res.status(404)
  res.render('error/404', {
    title: '404: File No Found',
    auth: sess.authenticated || false,
    isadmin: sess.isadmin || false
  })
})
app.use(function (err, req, res, next) {
  var sess = req.session
  console.log(sess)

  res.status(500)
  res.render('error/500', {
    title: '500: Internal Server Error',
    error: err,
    auth: sess.authenticated || false,
    isadmin: sess.isadmin || false
  })
})

// // error handler
// app.use(function(err,req,res,next){
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });

app.listen(packagejson.port || 8080)

module.exports = app
