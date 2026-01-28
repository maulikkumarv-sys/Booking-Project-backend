
const express=require("express")


const { addbooking, getbooking, deletbooking, updatebooking }=require("../controller/bookingcontroller")



const bookingroute=express.Router()

bookingroute.post("/add",addbooking)
bookingroute.get("/get",getbooking)
bookingroute.delete("/delete/:id",deletbooking)
bookingroute.patch("/update/:id",updatebooking)




module.exports=bookingroute