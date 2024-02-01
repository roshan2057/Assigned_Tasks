const fs = require("fs").promises;
const user_path = "./src/JsonFile/user.json";
const product_path = "./src/JsonFile/product.json";

async function GetIdProduct() {
  let user = JSON.parse(await fs.readFile(product_path, "utf-8"));
  return user[user.length - 1].id + 1;
}

async function GetIdUser() {
  let user = JSON.parse(await fs.readFile(user_path, "utf-8"));
  return user[user.length - 1].id + 1;
}

module.exports = {GetIdProduct, GetIdUser};
