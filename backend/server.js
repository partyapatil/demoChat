const express = require("express");
const { chats } = require("./data");
const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./Routes/userRoutes");
const chatRouter = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const { Socket } = require("socket.io");
const testdata=require("./testData")
const {DemandData}=require("./testData")
const {OprationData}=require("./testData");
const { saveforcast, getForcast, updateForcast, deleteForcast, findd, insertdata, insertManydata } = require("./controller/forcastController");
connectDB();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
methods:["GET","POST","PUT","DELETE"],
  credentials: true,
}));
app.use(express.json());

app.use("/api", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoutes);

app.use("/api/getData",(req,res)=>{
  console.log(testdata)
  res.json(testdata);
  // return testdata
})
app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/demand", (req, res) => {
  res.send(DemandData);
});
app.get("/opration", (req, res) => {
  res.send(OprationData);s
});
app.post("/forcast", saveforcast);
app.get("/forcast/:project_id", getForcast);
app.put("/forcast/:project_id", updateForcast);
app.delete("/forcast/:project_id", deleteForcast);
app.get("/forcastfind/:project_id", findd);
app.get("/forcastinsert",insertdata);
app.get("/forcastinsertmany",insertManydata);

const server=app.listen(5000, () => { 
});

const io=require('socket.io')(server,{
  pingTimeout:60000,
cors:{
  origin: "http://localhost:3000", // match exactly!
methods:["GET","POST","PUT","DELETE"],
credentials:true
}
})
// io.on("connection", (socket) => {
//   console.log("A client connected with socket ID:", socket.id);
//   socket.emit("connection done", "connect done successfully");

//   socket.on("setup", (userdata) => {
//     console.log("user joined",userdata._id)
//     socket.join(userdata._id);
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log(room, "user joined Room");
//     console.log(`Socket ${socket.id} belongs to rooms:`, Array.from(socket.rooms));

//   });

//   socket.on("typing", (room) =>{ socket.to(room).emit("typing");
//   console.log("typing");
//   });
//   socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     console.log("new message",newMessageRecieved)
//     var chat = newMessageRecieved.chat;
//     if (!chat || !chat.users) {
//       console.error("chat or chat.users is undefined!");
//       return;
//     }
//     chat.users.forEach((user) => {
//       if (user._id === newMessageRecieved.sender._id) {
//         console.log(`Skipping sender: ${user._id}`);
//         return;
//       }
//       console.log(`Emitting "message recieved" to user: ${user._id}`);
//       socket.to(user._id).emit("message recieved", newMessageRecieved);   
//      });
//   });

//   socket.on("disconnect", () => {
//     // console.log("A client disconnected with socket ID:", socket.id);
//   });
// });
io.on("connection",(socket)=>{
  console.log("A client connected with socket ID:", socket.id);
  socket.emit("connection done", "connect done successfully")

  socket.on("setup",(userdata)=>{
    console.log(userdata,"setupRequest")
    socket.join(userdata._id)
  })
  socket.on("join chat",(room)=>{
    socket.join(room)
console.log(room,"user joined Room")

  })
  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));
  socket.on("new message", (newMessageRecieved) => {
   
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
})

