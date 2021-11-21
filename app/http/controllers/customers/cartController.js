


function  cartController (){
    return{
     cart(req,res) {
     res.render("customer/cart")
     },


     update(req,res) {
      
  // FOR THE FIRST TIME CREATING CART 

  if(!req.session.cart) {
      req.session.cart={
      items:{},
      totalqty:0,
      totalPrice:0

      }
    }

    let cart = req.session.cart
    console.log(cart)

// check if item does not exist or not // nehi hai 
if(!cart.items[req.body._id]){
   cart.items[req.body._id]={
     item: req.body,
     qty: 1
   }
   cart.totalqty = cart.totalqty + 1
   cart.totalPrice = cart.totalPrice + req.body.price
}else{ // agar cart mai hai

  cart.items[req.body._id].qty=    cart.items[req.body._id].qty + 1
  cart.totalqty = cart.totalqty + 1
  cart.totalPrice = cart.totalPrice + req.body.price

}



return res.json({totalqty:req.session.cart.totalqty})



        },
  


 



    }
  }






module.exports= cartController;


