const Order=require('../models/orderModel')
const Product=require("../models/ProductModal")
const ErrorHander = require("../utils/errorhander")
const catchAsyncError=require('../middleware/catchAsyncError')

//create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      product
    } = req.body;
  console.log(orderItems)
  console.log(shippingInfo)
    const order = await Order.create({
      shippingInfo,
      orderItems,
      product
    });
  
    res.status(201).json({
      success: true,
      order,
    });
  });


  //get single order details by user//
  // exports.getSingleOrder=catchAsyncError( async(req,res,next)=>{
  //     const order= await Order.findById(req.params.id).populate(

  //       "user","name email")

  //     if(!order){
  //         return next(ErrorHander("order not found with id",404))
  //     }
  //     res.status(200).json({
  //         success:true,
  //         order,
  //     })
  // })




      //get all  orders by--admin//
      exports.getAllOrders=catchAsyncError( async(req,res,next)=>{
        const orders= await Order.find().populate('product')
        // let totalAmout=0;
        // orders.forEach((order) => {
        //     totalAmout+=order.totalPrice;
        // });

        res.status(200).json({
            success:true,
            // totalAmout,
            orders,
        })
    })




//   update order status --admin////////////////////////////////////////////////
       exports.updateOrder=catchAsyncError( async(req,res,next)=>{
         const order= await Order.findById(req.params.id)
         if(!order){
          return next(new ErrorHander("order not found with id",404))
      }
///ya neacha wali if ma check karra ga k order status kiaa haa.. agr delivered htoh ya chala gi
if(order.orderStatus==="Delivered"){
     return next(new ErrorHander("you hava already delivered this order",404))
 }
if(req.body.status==="Shipped"){
  order.orderItems.forEach(async (order)=>{
    await updateStock(order.product,order.quantity)
 })
}
order.orderStatus=req.body.status
// ya neacha wali if iss liya haa k jb hm oderStatus baja ga k delivered
if(req.body.status==="Delivered"){
     order.deliveredAt=Date.now()
}
await order.save({validateBeforeSave:false})
   res.status(200).json({
       success:true,
      })
})

async function updateStock(id,quantity){
   const product = await Product.findById(id);
       product.Stock-=quantity
      await product.save({validateBeforeSave:false})

}


    //delete order by--admin//
    exports.deleteOrder=catchAsyncError( async(req,res,next)=>{
      const order= await Order.findById(req.params.id)
      if(!order){
        return next(new ErrorHander("order not found with id",404))
    }
      await order.remove()

      res.status(200).json({
          success:true,
      
      })
  })
