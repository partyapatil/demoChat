const jwt=require("jsonwebtoken");
const secret="pratahemsh";
const generateToken=(id)=>{
    return jwt.sign({id},secret,{
        expiresIn:"24h",
    })
}

module.exports=generateToken;