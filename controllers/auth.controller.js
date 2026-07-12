import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

class usersLogic {
    register = async (req, res) => {
        const {
            nom,
            password,
            email,
            role
        } = req.body;
        const endEmail = "@gmail.com"

        const exitUser = await User.findOne({
            where: { email }
        });
        if (exitUser)
            return res.status(400).json({
                message: "this is email already exists"
            })
        if (!req.body.email.endsWith(endEmail)) return res.status(400).json({ message: "not a email addres" })

        const adminExits = await User.findOne({
            where: { role }
        })
        if (role === "admin" && adminExits) return res.status(400).json({
            message: "role admin not available"
        })
        const hash = await bcrypt.hash(password, 12);

        const user = await User.create({
            nom,
            email,
            password: hash,
            role
        });
        user.password = undefined;

        res.status(201).json(user)
    }

    login = async (req, res) => {
        const {
            email,
            password
        } = req.body

        const user = await User.findOne({
            where: { email },
        })
        if (!user) return res.status(404).json({
            message: "email is correct"
        })

        const ismatch = await bcrypt.compare(password, user.password)

        if (!ismatch) return res.status(401).json({

            message: "password is correct"
        })
        console.log("login secret:", process.env.JWT_SECRET)
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            },
        )
        const refresh_Token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET_REFRESH,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
            }
        )
        user.refreshToken = refresh_Token
        await user.save()
        // const decode = jwt.verify(
        //     refresh_Token,
        //     process.env.JWT_SECRET_REFRESH
        // )
        // console.log(decode)
        // console.log(refresh_Token)
        res.status(200).json({
            //user,
            message: "login succesfully",
            "this is token ": token,
            "this is refresh token : ": refresh_Token,
        })
    }
    me = async (req, res) => {
        try {
            const user = await User.findByPk(req.authUser.id)
            if (!user) return res.status(400).json({ message: "user not found" })
            user.password = undefined;
            res.status(200).json({ user })

        } catch (err) {
            console.log({ "error in ": err.message })

        }
    }
}
export default new usersLogic();