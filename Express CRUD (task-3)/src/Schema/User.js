const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  price: Number,
  quantity: {
    type: Number,
    required: true,
  },
});
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [CartSchema],
});

const user = mongoose.model("User", UserSchema);

module.exports = user;
