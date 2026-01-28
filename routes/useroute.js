
const express=require("express") 

const { signup, login, getusers }=require("../controller/usercontroller")

const useroute=express.Router()

useroute.post("/signup",signup)
useroute.post("/login",login)
useroute.get("/get",getusers)



module.exports=useroute