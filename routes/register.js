const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/UserModel");
const { registerValidators } = require("../utils/validator");
const router = Router();

router.get("/", (req, res) => {
    res.render("auth/register", {title: "Register", error: req.flash("error")})
});

router.post("/", registerValidators, async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        const exerrors = validationResult(req);
        if(!exerrors.isEmpty()) {
            req.flash("error", exerrors.array()[0].msg);
            return res.status(422).redirect("/reg");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username: username,
            email: email,
            password: hashPassword,
            cart: {items: []},
        });
        await user.save();
        res.redirect("/auth/login");

    }catch(err) {
        console.log(err)
    }
})

module.exports = router;
















