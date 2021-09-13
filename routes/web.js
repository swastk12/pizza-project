
const authcontroller = require("../app/http/controllers/authcontroller")
const cartController = require("../app/http/controllers/customers/cartController")
const homeController= require("../app/http/controllers/homeController")

function initRoutes(app) {


app.get("/",homeController().index )
    
app.get("/cart", cartController().cart )

app.get("/login",authcontroller().login)
        
app.get("/register",authcontroller().register)


}

module.exports = initRoutes;