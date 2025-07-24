const mongoose = require("mongoose");

const connectDB = async () => {
const mongoURI = "mongodb+srv://pppatil9916:xEVWooFMIOQF34Gs@cluster0.pnjnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    const con = await mongoose.connect(mongoURI);
    console.log("MongoDB connected:", con.connection.host);
    console.log("hello")
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
