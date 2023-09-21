const express=require('express')
const { newOrder, getAllOrders } = require('../controllers/orderController')
const router=express.Router()
///to create the order
router.route("/order/new").post(newOrder)
//user get the single order details 
// router.route("/order/:id").get(getSingleOrder)

router.route("/admin/orders").get(getAllOrders)
//admin update the status
// router.route("/admin/order/:id").put(updateOrder)
//admin delete the order 
// router.route("/admin/order/:id").delete(deleteOrder)


module.exports=router