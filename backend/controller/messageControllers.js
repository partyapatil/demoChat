const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    const newMessage = {
      sender: req.user._id,
      content,
      chat: chatId,
    };
  
    try {
      // Create and populate message
      let message = await Message.create(newMessage);
  
      message = await Message.findById(message._id)
        .populate("sender", "name pic")
        .populate({
          path: "chat",
          populate: {
            path: "users",
            select: "name pic email",
          },
        });
  
      // Update the latest message in the chat
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  

module.exports = { allMessages, sendMessage };