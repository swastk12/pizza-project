const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts")
const path = require("path");
const app = express();
const port= process.env.PORT || 3000

app.use(express.static('public'))

// SET TEMPLATE ENGINE  
const dell = path.join(__dirname,"./resources/views")  
app.use(expressLayout)
app.set("views", dell );
app.set("view engine", "ejs")

app.get("/",(req,res)=>{
    res.render("home")
    })

app.get("/cart",(req,res)=>{
        res.render("customer/cart")
        })

app.get("/login",(req,res)=>{
            res.render("auth/login")
            })
    
 app.get("/register",(req,res)=>{
                res.render("auth/register")
                })
        




app.listen(port, ()=>{
    console.log(` port successfull ${port}`)
})