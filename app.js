const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const Mongostore = require('connect-mongo')(session)
const { publicDecrypt } = require('crypto')
const { Mongoose } = require('mongoose')

//load config
dotenv.config({path: './config/config.env'})

//passport config
require('./config/passport.js')(passport)

const{formatDate, stripTags,editIcon} = require('./helpers/hbs')

connectDB()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs({
  helpers:{
    formatDate,
    stripTags,
    editIcon,
  },
  defaultLayout: 'main' ,extname: '.hbs'}));
app.set('view engine', '.hbs');

//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new Mongostore({ mongooseConnection: mongoose.connection})
  }))
  

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})


//static
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/', require('./routes/index') )
app.use('/auth', require('./routes/auth') )
app.use('/stories', require('./routes/stories') )




const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
