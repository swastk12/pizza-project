const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts")
const path = require("path");
const app = express();
const port= process.env.PORT || 3000
const dell = path.join(__dirname,"./resources/views")



app.get("/",(req,res)=>{
    res.render("home")
    })

app.use(expressLayout)
app.set("views", dell );
app.set("view engine", "ejs")




app.listen(port, ()=>{
    console.log(` port successfull ${port}`)
})