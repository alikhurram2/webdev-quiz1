const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");

router.use("/auth", authRouter);

router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token.split(" ")[1], "MY_SECRET")// 
        req.user = user;
        //console.log("USER:", token);
        next()
    } catch (e) {
        return res.json({ msg: "TOKEN NOT FOUND / INVALID" })
    }
})

router.use("/admin", adminRouter);
router.use("/user", userRouter);

module.exports = router;