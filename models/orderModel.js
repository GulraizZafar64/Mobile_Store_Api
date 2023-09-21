const mongoose=require('mongoose')


const orderSchema=new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:true},
        city:{
            type:String,
            required:true},
        province:{
            type:String,
            required:true
        },
        zip:{
            type:Number,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true
        },
        
    },
    orderItems:{
        quantity:{
            type:Number,
            required:true
        },
        totalPrice:{
            type:Number,
            required:true,
            default:0
        },
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing"
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model("Order",orderSchema)