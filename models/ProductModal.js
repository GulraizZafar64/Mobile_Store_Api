const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
   name:{
       type:String,
       required:[true,"Please enter product name"],
       trim:true    
    },
   description:{
    type:String,
    required:[true,"Please enter product description"]
    },
   company:{
    type:String,
    required:[true,"Please enter product company"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxlength:[8,"Price cannot exceed 8 characters"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product price"],
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    colors: [
        {
          type: String,
        }
      ],
   
    createdAt:{
        type:Date,
        default:Date.now
    }
        
})

module.exports=mongoose.model("Product",productSchema)