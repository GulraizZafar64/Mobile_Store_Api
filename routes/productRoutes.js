const express=require('express');
const { createProduct, getAdminProducts, deleteProduct, updateProduct } = require('../controllers/productController');
const router =express.Router();
router.route("/createProduct").post(createProduct)
router.route("/getProduct").get(getAdminProducts)
router.route("/product/:id").delete(deleteProduct)
router.route("/product/:id").put(updateProduct)


module.exports=router