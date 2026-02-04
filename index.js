
const express=require("express")
const db=require("./config/db")
const cors=require("cors")
const bodyparser=require("body-parser")
const useroute = require("./routes/useroute")
const bookingroute = require("./routes/bookingroute")
const docroute = require("./routes/doctorroute")


const app=express()  
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded())
app.use("/user",useroute)
app.use("/booking",bookingroute)
app.use("/doctor",docroute)

app.listen(8002,()=>{
    console.log('port is running on 8002')
})