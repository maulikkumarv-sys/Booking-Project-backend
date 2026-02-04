
const express=require("express") 

const { signup, login, getusers, getAdmins }=require("../controller/usercontroller")
const { verifytoken } = require("../middelwere/auth")
const authorize = require("../middelwere/authorize")

const useroute=express.Router()

useroute.post("/signup",signup)
useroute.post("/login",login)
useroute.get("/get",getusers)
useroute.get("/admin",verifytoken,authorize("admin"),getAdmins)



module.exports=useroute