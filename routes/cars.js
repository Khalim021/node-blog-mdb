const { Router } = require("express");
const Tesla = require("../models/TeslaModel");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", async (req, res) => {
    try {
        const cars = await Tesla.find()
        .populate("userId", "email name")
        .select("title subtitle description teslaRange peakPower awd price image");
        res.render("cars", {isCars: true, userId: req.user ? req.user._id.toString() : null, cars});
    }catch(err) {
        console.log(err)
    }
});

router.get("/:id/edit", auth, async (req, res) => {
    if(!req.query.allow) {
        return res.redirect("/");
    }
    try {
        const tesla = await Tesla.findById(req.params.id);
        res.render("carEdit", {
            title: `Edit ${tesla.title}`,
            tesla,
        })
    }catch(err) {
        console.log(err)
    }
});

router.post("/edit", auth, async (req, res) => {
    const { id } = req.body;
    delete req.body.id
    await Tesla.findByIdAndUpdate(id, req.body)
    res.redirect("/cars")
});

router.post("/remove", auth, async (req, res) => {
    try {
        await Tesla.deleteOne({_id: req.body.id});
        res.redirect("/cars")
    }catch(err) {
        console.log(err)
    }
})

router.get("/:id", async (req, res) => {
    const tesla = await Tesla.findById(req.params.id);
    res.render("teslaDetail", {
        layouts: "detail",
        title: `TeslaModel ${tesla.title}`, 
        tesla
    })
})

module.exports = router;











