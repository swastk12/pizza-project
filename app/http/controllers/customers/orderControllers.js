const Order = require("../../../models/order")
const moment = require('moment')



function orderControllers(){

    return{
        store(req,res){
                console.log(req.body)
            // validate request
         const {phone, address} = req.body
         if(!phone || !address){
             req.flash('error', 'All fields are required')
              
             return res.redirect('/cart')
         }
             const order = new Order({
                 customerId : req.user._id,
                 items: req.session.cart.items,
                 phone,
                 address
             })
             order.save().then(result =>{

             req.flash('success', 'order placed successfully')
             delete req.session.cart
                 return res.redirect('/customer/order')
                   }).catch(err =>{
                     req.flash('error','Something went wrong ')
                     return res.redirect('/cart')
                
             
             })


        },

     async index(req,res){
         const orders = await Order.find({ customerId: req.user._id },null,{sort:{'createdAt':-1}})
          res.render('customer/order', {orders: orders, moment:moment})
         console.log(orders)
     }




    }
}

module.exports=orderControllers