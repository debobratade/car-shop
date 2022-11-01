const wonerModel = require("../models/wonerModel");

const jwt = require('jsonwebtoken')
const jwtkey = '@Rishi'

const createWoner = async function (req, res) {
  try {
    let data = req.body;

    let saveData = await wonerModel.create(data);
    saveData=saveData.toObject()
    delete saveData.password


    jwt.sign({saveData}, jwtkey, {expiresIn: "1h"}, (err, token)=>{
      if(err){
        return res.status(500).send({msg: "Something went wrong" })  
      }
      return res.status(201).send({data: saveData, msg: "successfully created", auth:token})  

     })

    // return res.status(201).send({ status: true, msg: "successfully created", data: saveData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


const loginWoner = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if(!req.body.email || !req.body.email  ) return res.send({result: "Kindly input email and password"})
  let woner =await wonerModel.findOne({ email: email, password: password }).select("-password")
  if(woner){

     jwt.sign({woner}, jwtkey, {expiresIn: "1h"}, (err, token)=>{
      if(err){
        return res.status(500).send({msg: "Something went wrong" })  
      }
      return res.status(200).send({woner, auth:token})  

     })

  }else{
    return res.send({msg: "No user found"})
  }
}









module.exports.createWoner = createWoner;
module.exports.loginWoner = loginWoner;
