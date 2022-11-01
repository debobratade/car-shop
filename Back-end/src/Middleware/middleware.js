
const jwt = require('jsonwebtoken')
const jwtkey = '@Rishi'

function verify_token(req, res, next){
    let token = req.headers['authorization']
     
    if(token){
        token = token.split(' ')[1]
        jwt.verify(token, jwtkey, (err, valid)=>{
         
            if(err){
                return res.status(401).send({msg: "Error in token"})
            }else{
                next()
            }
        })
    }else{
        return res.status(400).send({msg: "Add token"})
    }
}

module.exports.verify_token=verify_token