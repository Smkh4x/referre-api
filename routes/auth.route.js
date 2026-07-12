import usersLogic from "../controllers/auth.controller.js";
import express from "express";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import verfiyToken from "../controllers/verify.token.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import registerSchema from "../controllers/auth.validation.js";


const router = express.Router();

router.post("/register",authenticate, authorize("admin"),validate(registerSchema), usersLogic.register);
router.post("/login", usersLogic.login);
router.get("/me",authenticate, usersLogic.me);
router.get("/admin", authenticate, authorize("admin"), (req, res) => {
    res.json({
        message: "welcome admin",
    })
})
router.post("/refresh", verfiyToken);

export default router;