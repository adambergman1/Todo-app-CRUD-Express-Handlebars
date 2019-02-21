/**
 * The starting point of the application.
 *
 * @author Adam Bergman
 * @version 1.0
 */

require('dotenv').config()
const express = require('express')
const hbs = require('express-hbs')
const session = require('express-session')
const path = require('path')
const logger = require('morgan')
const mongoose = require('./config/mongoose')
const middlewares = require('./middleware/middleware')

const app = express()

// connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// view engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// additional middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// setup and use session middleware
const sessionOptions = {
  name: 'scrud',
  secret: 'uV9wjNeEtsDPz5v38bKPQPxAt8vkASty',
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true, // dont allow client script messing with the cookie
    sameSite: 'lax' // protect against POST csrf-attack
  }
}

app.use(session(sessionOptions))

app.use((req, res, next) => {
  if (req.session && req.session.username) {
    res.session = { username: req.session.username }
    res.locals.username = req.session.username
  }
  next()
})

// middleware to be executed before the routes
app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

// routes
app.use('/', require('./routes/homeRouter'))
app.use('/todo', require('./routes/toDoRouter'))
app.use('/login', middlewares.redirectHomeIfUserIsLoggedIn, require('./routes/loginRouter'))
app.use('/register', middlewares.redirectHomeIfUserIsLoggedIn, require('./routes/registerRouter'))
app.use('/logout', require('./routes/logoutRouter'))

// catch 404
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'public', '404.html'))
})

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal Server Error')
})

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`))

hbs.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this)
  }
  return options.inverse(this)
})
