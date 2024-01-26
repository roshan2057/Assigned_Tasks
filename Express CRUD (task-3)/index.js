const express = require("express");
const app = express();
const PORT = 5000;
const ProductRoute = require("./src/Routes/ProductRoute");

app.use("/product", ProductRoute);

app.use("/*", (req, res) => {
  res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
