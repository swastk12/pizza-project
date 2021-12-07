
require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts")
const path = require("path");
const app = express();
const port= process.env.PORT || 3000
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require('express-flash')
const MongodbStore = require('connect-mongo')
//var url_module = require('url');
const passport = require('passport')


//database connection
//const url = "mongodb://localhost/pizza-app";

 mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const connection= mongoose.connection
connection.once('open', ()=>{
console.log("connected")
})


// Session store
//let mongoStore = new MongoDbStore({
  //              mongooseConnection: connection,
    //            collection: 'sessions'
      //      })

// Event emitter
//const eventEmitter = new Emitter()
//app.set('eventEmitter', eventEmitter)


// session config
app.use(session({
  secret:process.env.COKKIE_SECRET,
  resave:false,
  store:MongodbStore.create({
     client: connection.getClient()
  }),
  saveUninitialized:false,
  cookie:{maxAge:1000*60*60*24}
   // cookie:{maxAge:1000*10}
}))


// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)
app.use((req,res)=>{
  res.status(404).send("<h1> 404, page not found </h1>")
})
//app.use((req, res) => {
  //  res.status(404).render('errors/404')
//})

app.listen(port, ()=>{
    console.log(` port successfull ${port}`)
})



