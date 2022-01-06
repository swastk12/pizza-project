
const authcontroller = require("../app/http/controllers/authcontroller")
const cartController = require("../app/http/controllers/customers/cartController")
const orderControllers = require("../app/http/controllers/customers/orderControllers")
const adminOrderController = require("../app/http/controllers/admin/orderController")
const homeonecontroller = require("../app/http/controllers/homeonecontroller")
const homeController= require("../app/http/controllers/homeController")
const guest = require('../app/http/middleware/guest')
const authe = require("../app/http/middleware/auth")





function initRoutes(app) {



app.get("/",homeController().index )

app.get("/home-one", homeonecontroller().index)
    
app.get("/login",guest,authcontroller().login)

app.post("/login",authcontroller().postLogin)
        
app.get("/register",guest,authcontroller().register)

app.post("/register",authcontroller().postRegister)

app.post("/logout",authcontroller().logout)

app.get("/cart", cartController().cart )

app.post("/update-cart", cartController().update )


// customer order-routes
app.post("/orders", authe, orderControllers().store )

app.get('/customer/order', authe, orderControllers().index)

// admin orders

app.get('/admin/orders', adminOrderController().index)

}




module.exports = initRoutes;


