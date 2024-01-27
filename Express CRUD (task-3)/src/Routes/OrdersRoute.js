const express = require("express");
const router = express.Router();
const {
  OrderHistory,
  Add_to_cart,
  Place_Order,
} = require("../Controller/OrderController");

// Create an API to list order history
router.get("/list", OrderHistory);

//  Users should be able to add products to cart
router.post("/addto_cart", Add_to_cart);

// Set a minimum threshold for the total price of an order.
router.post("/checkout", Place_Order);

module.exports = router;
