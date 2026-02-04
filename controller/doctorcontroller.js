

const doctormodel=require("../model/doctormodel")



const adddoctor=async (req,res)=>{

    try{
      const data=await doctormodel.create(req.body)
      return res.send(data)

    }catch(error){
        console.log(error)
    }
}



const getdoctor=async (req,res)=>{
    try{
       const data=await doctormodel.find({})
       return res.send(data)

    }catch(error){
        console.log(error)
    }
}



const getdoctorbyid=async (req,res)=>{
    try{
       const data=await doctormodel.findById(req.params.id)
       return res.send(data)

    }catch(error){
        console.log(error)
    }
}

const updatedata=async (req,res)=>{
    const id=req.params.id 
    try{
      const data=await doctormodel.findByIdAndUpdate(id,req.body)
      return res.send(data)

    }catch(error){
        console.log(error)
    }
}

module.exports={adddoctor,getdoctor,getdoctorbyid,updatedata}