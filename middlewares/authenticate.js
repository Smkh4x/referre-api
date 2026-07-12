import jwt from "jsonwebtoken";
const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    // console.log("header :", authHeader)

    if (!authHeader) return res.status(401).json({ message: "No token available" })

    const token = authHeader.split(" ")[1]

    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.authUser = decode;
        console.log(req.authUser)
        next();

    } catch (err) {
        console.log({error: err.message})
        return res.status(401).json({
            message: "invalid token"
        })
    }


}
export default authenticate;