import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
const verfiyToken = async (req, res) => {
    try {
       const {
        refreshToken,
    } = req.body

    if (!refreshToken) return res.status(400).json({ message: "refreshToken not found" })

    const decode = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH
    )
    req.user = decode;
    console.log("check req user : ", req.user)

    const user = await User.findByPk(req.user.id)
    console.log("refresh token in database : ",user.refreshToken)

    if(user.refreshToken !== refreshToken) return res.status(401).json({
        message: "Refresh token does not match"
    })
    const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            },
    )
    console.log("new refresh token : ",token)
    res.status(200).json({message: "succesfully"})
 
    } catch (err) {
        console.log({error: err.message})
        
    }
    

    




};
export default verfiyToken;