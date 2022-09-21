const { Router } = require("express");
const Order = require("../models/Orders");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", auth, async (req, res) => {
  try{
    const orders = await Order.find({"user.userId": req.user._id}).populate("user.userId");
    res.render("orders", { 
      isOrder: true,  
      orders: orders.map((s) => ({
        ...s._doc,
        price: s.cars.reduce((total, c) => {
          return (total += c.count * c.car.price)
        }, 0),
      })),
    
    });
  }catch(err) {
    console.log(err)
  }

});

router.post("/", auth, async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.carId");
    const cars = user.cart.items.map((s) => ({
    count: s.count,
    car: {...s.carId._doc},
  }));
  const order = new Order({
    user: {
      name: req.user.name,
      userId: req.user,
    },
    cars: cars,
  });
  await order.save();
  await req.user.cleanCart();
  res.redirect("/orders");

  }catch(err) {
    console.log(err)
  }
})


module.exports = router;














