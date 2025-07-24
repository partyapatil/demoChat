const { type } = require("express/lib/response")
const mongooes=require("mongoose")

const chatmodel=mongooes.Schema({
    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    users:[{
        type:mongooes.Schema.Types.ObjectId,
        ref:"User"
    }],

    latestMessage:{
        type:mongooes.Schema.Types.ObjectId,
        ref:"Message",
    },
    groupAdmin:{
        type:mongooes.Schema.Types.ObjectId,
        ref:"User"
    },
    groupPic: {
        type: String,
        default:
          "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg", // Default group image
      },
},
{
    timestamps:true,
}
)

const Chat=mongooes.model("Chat",chatmodel)
 
module.exports=Chat;