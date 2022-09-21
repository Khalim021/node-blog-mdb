const { Router } = require("express");
const Tesla = require("../models/TeslaModel");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", auth, (req, res) => {
    res.render("create", {isAdd: true});
});

router.post("/", auth, async (req, res) => {
    const cars = new Tesla({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        teslaRange: req.body.teslaRange,
        peakPower: req.body.peakPower,
        awd: req.body.awd,
        price: req.body.price,
        image: req.body.image,
        userId: req.user._id,
    });
    try {
        await cars.save();
        res.redirect("/cars")
    } catch(err){
        console.log(err);
    }
    
});

module.exports = router;



   

