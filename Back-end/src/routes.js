const express=require('express')
const router = express.Router()
const wonerController= require("./Controllers/wonerController")
const productController = require('./Controllers/productController')
const middleware = require('./Middleware/middleware')



router.post("/register",wonerController.createWoner)
router.post("/loginWoner",wonerController.loginWoner)

router.post("/addProduct", middleware.verify_token, productController.productAdd)
router.get("/productGet", middleware.verify_token, productController.productGet)
router.delete("/productDel/:id", middleware.verify_token, productController.deleteProduct)
router.get("/productGet/:id", middleware.verify_token, productController.getProductById)
router.put("/productUpdate/:id", middleware.verify_token, productController.updateProductById)
router.get("/productSearch/:key", middleware.verify_token, productController.productSearch)





module.exports= router;