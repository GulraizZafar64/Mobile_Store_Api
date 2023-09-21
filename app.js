const express=require("express")
const app=express()
const cookieParser = require('cookie-parser');
const errorMiddleware=require('./middleware/error')
// neacha wali do line file upload k liya
const fileUpload=require("express-fileupload")
const bodyParser=require('body-parser')

const dotenv=require('dotenv')
const cors = require('cors');


//config
app.use(cookieParser());
dotenv.config({path:"config/config.env"})
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(fileUpload())

// app.use(cors({
//   origin: '*'
// }));
//routs imports

const user=require("./routes/userRoute")
const product=require("./routes/productRoutes")
const order=require("./routes/orderRoute")
app.use("/api/v1",user)
app.use("/api/v1",product)
app.use("/api/v1",order)

//middleware for error
app.use(errorMiddleware)

module.exports=app