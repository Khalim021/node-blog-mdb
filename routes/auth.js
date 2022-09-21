const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const router = Router();

router.get("/login", async (req, res) => {
  res.render("auth/login", {isLogin: true, Error: req.flash("Error")});
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/reg");
  });
});

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const client = await User.findOne({ email });

    if(client) {
      const samePassword = bcrypt.compare(password, client.password);
      if(samePassword) {
        req.session.user = client;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
        if(err) throw err;
        res.redirect("/");
        });
      }
    }else {
      req.flash("Error", "Invalid Password or email");
      res.redirect("/auth/login");
    }
  } catch(err) {
    req.flash("Error", "This email address is not found");
      console.log(err);
  }
    
});

module.exports = router;











