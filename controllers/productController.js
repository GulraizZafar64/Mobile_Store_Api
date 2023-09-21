const Product=require("../models/ProductModal")
const catchAsyncError=require('../middleware/catchAsyncError')
const cloudinary=require("cloudinary")

 
exports.createProduct=async (req,res,next)=>{

try {
  let images = [];
  let colors = [];
  
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
 

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  // console.log(colors)
  const color2=[]

  if (typeof req.body.colors === "string") {
    color2.push(req.body.colors);
  } else {
    // color2=req.body.colors
    for (let i = 0; i < req.body.colors.length; i++) {
      color2.push(req.body.colors[i],);
    }
  }
 
  req.body.images = imagesLinks;
  req.body.colors = color2;

  console.log(color2)
    const product=await Product.create(req.body)
  
    res.status(201).json({
        success:true,
        product
    })
} catch (error) {
   console.log(error)
}
  }

exports.getAdminProducts=async (req,res)=>{
 const products=await Product.find()

  res.status(201).json({
   success:true,
   products,

})
}
exports.deleteProduct= async (req,res,next)=>{
  try {
     const product = await Product.findById(req.params.id)

     await product.remove()

     res.status(200).json({
         success:true,
         message:"product is delete"
     }) 
     //deleting images
     for (let i = 0; i < product.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
       
     }
  } catch (err) {
     return next (new ErrorHander("product not found",404))   
      
 }
}





exports.updateProduct=async (req,res,next)=>{
  try {
      let product= await Product.findById(req.params.id) 

      console.log(req.body.colors)
      console.log(product)

 //ya neacha haa k agr user na ak he image di toh ussa images wali array ma push krdo agr zada haa toh images wali array ko wasa he req.body k equal krdiya usma push hojaya gi
      
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}
//mtlb k image jo haa undefiend nai hui mtlb k image exist krti haa toh purani images cludnary sa delete krni haa ak ak kr k iss liya loop chala
if (images!==undefined){
  for (let i = 0; i < product.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
   
 }
 const imagesLinks = [];
//ya neacha new images cloudnary per upload krna k liya
 for (let i = 0; i < images.length; i++) {
   const result = await cloudinary.v2.uploader.upload(images[i], {
     folder: "products",
   });

   imagesLinks.push({
     public_id: result.public_id,
     url: result.secure_url,
   });
 }
 const color2=[]

 if (typeof req.body.colors === "string") {
   color2.push(req.body.colors);
 } else {
   for (let i = 0; i < req.body.colors.length; i++) {
     color2.push(req.body.colors[i],);
   }
 }
 req.body.images=imagesLinks
 req.body.colors = color2;
 
 console.log(req.body.colors)
}
//simple product update
  product= await Product.findByIdAndUpdate(req.params.id,{
      $set:req.body
  },{new:true})
  res.status(201).json({
      success:true,
      product
  }) 
  } catch (err) {
        res.status(500).json({
      success:false,
      error:err
  })    
  }

}
