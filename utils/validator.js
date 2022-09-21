const { body } = require("express-validator");
const User = require("../models/UserModel");

exports.registerValidators = [
    body("email").isEmail().withMessage("Please Enter valid email address!").custom( async (value, {req}) => {
        try {
            const user = await User.findOne({email: value});
            if(user) {
                return Promise.reject("This Email Address is already exist!")
            }
        }catch(err) {
            console.log(err)
        }
    }).normalizeEmail(),
    body("password", "Password must be contain at least 6 characters")
    .isLength({min: 6, max: 56}).isAlphanumeric().trim(),
    body("username").isLength({min: 3}).withMessage("Name must be at least 3 character").trim(),
]













