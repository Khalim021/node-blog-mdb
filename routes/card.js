const { Router } = require("express");
const Tesla = require("../models/TeslaModel");
const auth = require("../middleware/auth");
const router = Router();

function mapCart(cart) {
    return cart.items.map((s) => ({
        ...s.carId._doc,
        id: s.carId.id,
        count: s.count
    }));
};

function computedPrice(cars) {
    return cars.reduce((total, car) => {
        return (total += car.price * car.count)
    }, 0);
};

router.post("/add", auth, async (req, res) => {
    const tesla = await Tesla.findById(req.body.id);
    await req.user.addToCart(tesla);
    res.redirect("/card");
});

router.delete("/remove/:id", auth, async (req, res) => {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate("cart.items.carId");
    const cars = mapCart(user.cart);
    const cart = {
        cars,
        price: computedPrice(cars)
    }
    res.status(200).json(cart);
})


router.get("/", auth, async (req, res) => {
    const user = await req.user.populate("cart.items.carId");
    const cars = mapCart(user.cart)
    res.render("card", {
        title: "Basket",
        isCard: true,
        cars: cars,
        price: computedPrice(cars),
    });
});

module.exports = router;








