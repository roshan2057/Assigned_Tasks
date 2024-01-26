const fs = require("fs").promises;
const file_path = "./src/JsonFile/user.json";

async function GetId() {
  let user = JSON.parse(await fs.readFile(file_path, "utf-8"));
  return user[user.length - 1].id + 1;
}

module.exports = GetId;
