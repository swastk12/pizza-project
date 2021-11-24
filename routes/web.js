
const authcontroller = require("../app/http/controllers/authcontroller")
const cartController = require("../app/http/controllers/customers/cartController")
const homeController= require("../app/http/controllers/homeController")
const menu = require("../menus.json")
const guest = require('../app/http/middleware/guest')





function initRoutes(app) {



app.get("/",homeController().index )
    
app.get("/login",guest,authcontroller().login)

app.post("/login",authcontroller().postLogin)
        
app.get("/register",guest,authcontroller().register)

app.post("/register",authcontroller().postRegister)

app.post("/logout",authcontroller().logout)

app.get("/cart", cartController().cart )

app.post("/update-cart", cartController().update )



    

}




module.exports = initRoutes;


