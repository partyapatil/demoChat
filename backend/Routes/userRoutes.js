const express=require("express");
const { registerUser, authUser, allUser } = require("../controller/userController");
const {protect}=require("../middleware/authMiddleware")


const router=express.Router();

router.route("/user").post(registerUser)
// router.post("/login").post(registerUser.authUser)
router.post("/login",authUser)
router.get("/user",protect,allUser)
 module.exports=router;