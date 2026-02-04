
const mongoose=require("mongoose")

const doctorSchema=mongoose.Schema({

    doctorname:{
        type:String
    },
    specialist:{
        type:String
    },
    image:{
        type:String
    }
    

    
})


const doctormodel=new mongoose.model("doctor",doctorSchema)
module.exports=doctormodel