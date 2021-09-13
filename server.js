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


//database connection
const url = "mongodb://localhost/pizza-app";

 mongoose.connect(url, {
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const connection= mongoose.connection
connection.once('open', ()=>{
console.log("connected")
})





// session store

//let mongoStore = new MongodbStore({
  //  mongooseConnection:storesData,
  //  collection:'sessions'
//})





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

app.use(flash());

app.use(express.static('public'))

// SET TEMPLATE ENGINE  
const dell = path.join(__dirname,"./resources/views")  
app.use(expressLayout)
app.set("views", dell );
app.set("view engine", "ejs")

require("./routes/web")(app)

app.listen(port, ()=>{
    console.log(` port successfull ${port}`)
})