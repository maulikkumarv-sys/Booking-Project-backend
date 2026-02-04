
const usemodel = require("../model/usemodel")
const jwt=require("jsonwebtoken")


const verifytoken = async (req,res,next) => {

    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Token required" })
    }
    try {

        const decode = jwt.verify(token, 'Private-Key')
        const user = await usemodel.findById(decode.id)

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role
        }
        next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }

}

module.exports = { verifytoken }