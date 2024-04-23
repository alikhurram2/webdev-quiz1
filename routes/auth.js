const bcrypt = require("bcrypt");
const admin = require("../models/admin");
const user = require("../models/user");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signUp", async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;
        let model;

        // Choose the appropriate model based on the isAdmin flag
        if (isAdmin) {
            model = admin;
        } else {
            model = user;
        }

        const existingUser = await model.findOne({ email });

        if (existingUser) return res.json({ msg: "User already exists" });

        const newUser = await model.create({ ...req.body, password: await bcrypt.hash(password, 5) });

        return res.json({ msg: "CREATED" });
    } catch (error) {
        console.error(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;
        let model;

        // Choose the appropriate model based on the isAdmin flag
        if (isAdmin) {
            model = admin;
        } else {
            model = user;
        }

        const existingUser = await model.findOne({ email });

        if (!existingUser) return res.json({ msg: "User does not exist" });

        const passwordCheck = await bcrypt.compare(password, existingUser.password);
        if (!passwordCheck) return res.json({ msg: "Invalid credentials" });

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            role: isAdmin ? 'admin' : 'user',
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "Logged in",
            token
        })
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;