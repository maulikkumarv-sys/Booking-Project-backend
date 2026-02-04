
const express=require("express")


const { addbooking, getbooking, deletbooking, updatebooking, getBookingByDoctor }=require("../controller/bookingcontroller")



const bookingroute=express.Router()

bookingroute.post("/add",addbooking)
bookingroute.get("/get",getbooking)
bookingroute.delete("/delete/:id",deletbooking)
bookingroute.patch("/update/:id",updatebooking)
bookingroute.get("/doctor/:id",getBookingByDoctor);






module.exports=bookingroute