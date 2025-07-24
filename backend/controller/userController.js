const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../generrateToken");
const registerUser = asyncHandler(async (req,res) => {
console.log(req.body);
  
  const { name, email, password,pic } = req.body;
  if (!name || !email || !password) {
    res.status(400).json("Insufficisnt data")
    throw new Error("sry we dint")
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists." });
    throw new Error("Missing required fields.");

  }
  const user = await User.create({
    name,
    email,
    pic,
    password,
  });
if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:(generateToken(user._id)),
    })

}else{
    res.status(400).json("user not created ")
    throw new Error("Failed to create the user")
}

});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Call matchPassword on the user instance
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("Login failed");
    throw new Error("Invalid username or password");
  }
});

const allUser=asyncHandler(async(req,res)=>{
const keywod=req.query.search ? {
  $or:[
    {name:{$regex:req.query.search,$options:"i"}},
    {email:{$regex:req.query.search,$options:"i"}},

  ]
}:{}
const users=await User.find(keywod).find({_id:{$ne:req.user._id}});
res.send(users)

})

module.exports={registerUser,authUser,allUser};
