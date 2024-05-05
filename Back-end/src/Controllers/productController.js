const productModel = require("../models/productModel");

const jwt = require('jsonwebtoken')
const jwtkey = '@Rishi'

const productAdd = async function (req, res) {
  try {
    let data = req.body;

    let saveData = await productModel.create(data);
    return res
      .status(201)
      .send({ status: true, msg: "successfully created", data: saveData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


const productGet = async function (req, res) {

   let products =await productModel.find()
   if(products.length>0){
    return res
      .status(200)
      .send( products );
   }else{
    res.status(404).send({ status: false, msg: "No product found" });
   }

}


const productSearch = async function (req, res) {

   let products =await productModel.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {price:{$regex:req.params.key}}
    ]
  })

   if(products){
    return res
      .status(200)
      .send( products );
   }else{
    res.status(404).send({ status: false, msg: "No product found" });
   }

}

const deleteProduct = async function (req, res) {
  const id = req.params.id

   let del =await productModel.deleteOne({_id:id})
   if(del){
    return res
      .status(200)
      .send( del );
   }else{
    res.status(404).send({ status: false, msg: "No product found" });
   }

}

const getProductById=async function (req, res) {
  const id = req.params.id

   let del =await productModel.findOne({_id:id})
   if(del){
    return res
      .status(200)
      .send( del );
   }else{
    res.status(404).send({ status: false, msg: "No product found" });
   }

}

const updateProductById=async function (req, res) {
  const id = req.params.id

   let del =await productModel.updateOne({_id:id}, {$set:req.body}, { new: true })
   if(del){
    return res
      .status(200)
      .send( del );
   }else{
    res.status(404).send({ status: false, msg: "No product found" });
   }

}

module.exports.productAdd=productAdd
module.exports.productGet=productGet
module.exports.deleteProduct=deleteProduct
module.exports.getProductById=getProductById
module.exports.updateProductById=updateProductById
module.exports.productSearch=productSearch