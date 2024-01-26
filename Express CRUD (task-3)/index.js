const express = require("express");
const app = express();
const PORT = 5000;
const ProductRoute = require("./src/Routes/ProductRoute");
const UserRoute = require("./src/Routes/UserRoute");

app.use("/product", ProductRoute);
app.use("/user", UserRoute);

app.use("/*", (req, res) => {
  res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
