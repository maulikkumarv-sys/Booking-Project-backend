const express=require("express")

const { adddoctor, getdoctor, getdoctorbyid, updatedata }=require("../controller/doctorcontroller")

const docroute=express.Router()

 docroute.post("/add",adddoctor)
 docroute.get("/get",getdoctor)
 docroute.get("/get/doctor/:id",getdoctorbyid)
 docroute.patch("/update/:id",updatedata)

module.exports=docroute