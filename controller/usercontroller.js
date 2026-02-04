
const usemodel=require("../model/usemodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const signup=async (req,res)=>{
    const{username,email,password,role}=req.body 

    try{
        const user=await usemodel.findOne({email})
        if(user){
            return res.status(400).json({ message: "User already exists" })
        
        }
        const match=await bcrypt.hash(password,10)

        const newuser=await usemodel.create({
            username:username,
            email:email,
            password:match,
            role:role || 'user'
        })

        return res.send({newuser})
    
      

    }catch(error){
        console.log(error)
    }
}




const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usemodel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res
        .status(401)
        .json({ message: "Email and password do not match" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      "Private-Key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token: token,
      role: user.role
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getusers=async(req,res)=>{
    try{
     const data=await usemodel.find()
     return res.send(data)



    }catch(error){
        console.log(error)
    }
}



const getAdmins = async (req, res) => {
  try {
    const admins = await usemodel.find({ role: "admin" }).select("-password")
    res.status(200).json(admins)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

module.exports={signup,login,getusers,getAdmins}



