const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
  quantity: Number,
  price: Number,
});

const OrderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  items: { type: [ItemSchema] },
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const order = mongoose.model("Order", OrderSchema);


module.exports=order