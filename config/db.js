
// const mongoose=require("mongoose")  

// mongoose.connect("mongodb://localhost:27017/bookingproject")

// const db=mongoose.connection 

// db.on("connected",()=>{
//     console.log('database is connected')
// })

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ Database is connected");
});

db.on("error", (err) => {
  console.log("❌ Database connection error:", err);
});
