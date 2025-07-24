const { type } = require("express/lib/response");
const mongooes=require("mongoose");



const { default: mongoose } = require("mongoose");

const MessageModal=mongoose.Schema({
sender:{type:mongooes.Schema.Types.ObjectId,ref:"User"},
content:{type:String,trim:true},
chat:{type:mongooes.Schema.Types.ObjectId,ref:"Chat"}
},{
    timestamps:true,
})

const Message=mongooes.model("Message",MessageModal)


module.exports=Message;