const express = require("express");
require('dotenv').config();
require('./src/Config/Database')
const app = express();
const PORT = 5000;
app.use(express.json())
const ProductRoute = require("./src/Routes/ProductRoute");
const UserRoute = require("./src/Routes/UserRoute");
const OrderRoute = require("./src/Routes/OrdersRoute");

app.use("/product", ProductRoute);
app.use("/user", UserRoute);
app.use("/order", OrderRoute);

app.use("/*", (req, res) => {
  res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
