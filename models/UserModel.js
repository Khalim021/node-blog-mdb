const {Schema, model} = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },

  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1
        },
        carId: {
          type: Schema.Types.ObjectId,
          ref: "Tesla",
          required: true
        }
      }
    ]
  }
});

userSchema.methods.addToCart = function(tesla) {
  let items = [...this.cart.items];
  const index = items.findIndex((s) => {
    return s.carId.toString() === tesla._id.toString();
  });
  if(index >= 0) {
    items[index].count = items[index].count + 1;
  } else {
    items.push({carId: tesla._id, count: 1});
  }
  this.cart = { items };
  return this.save();
};

userSchema.methods.removeFromCart = function (id) {
  let items = [...this.cart.items];
  const index = items.findIndex(
    (s) => s.carId.toString() === id.toString()
  );

  if (items[index].count === 1) {
    items = items.filter((s) => s.carId.toString() !== id.toString());
  } else {
    items[index].count--;
  }

  this.cart = { items };
  return this.save();
};

userSchema.methods.cleanCart = function() {
  this.cart = { items: []};
  return this.save();
};

module.exports = model("User", userSchema);



















