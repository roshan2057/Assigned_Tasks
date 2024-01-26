const fs = require("fs").promises;
const GetId = require("../Helper/unique_id");
const file_path = "./src/JsonFile/user.json";

const AddUser = async (req, res) => {
  const user = {
    name: "roshan",
    email: "rohsan@gmail.com",
    password: "itsnotencrypted",
  };
  try {
    const data = JSON.parse(await fs.readFile(file_path, "utf-8"));
    user.id = await GetId();
    data.push(user);
    await fs.writeFile(file_path, JSON.stringify(data));
  } catch {
    user.id = 1;
    await fs.writeFile(file_path, "[" + JSON.stringify(user) + "]");
  }
  res.send("Created");
};

const GetUser = async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(file_path, "utf-8"));
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

const UpdateUser = async (req, res) => {
  const id = parseInt(req.query.id) || 1;
  //new value
  const newvalue = {
    name: "roshan(updated)",
    email: "rohsan@gmail.com(updated)",
    password: "itsnotencrypted(updated)",
    id: id,
  };
  try {
    const data = JSON.parse(await fs.readFile(file_path, "utf-8"));
    const newdata = data.map((data) => (data.id === id ? newvalue : data));
    await fs.writeFile(file_path, JSON.stringify(newdata));
    res.send("Updated");
  } catch (error) {
    res.send(error);
  }
};

const DeleteUser = async (req, res) => {
  const id = parseInt(req.query.id) || 1;
  try {
    const data = JSON.parse(await fs.readFile(file_path, "utf-8"));
    const newdata = data.filter((data) => data.id !== id);
    await fs.writeFile(file_path, JSON.stringify(newdata));
    res.send("Deleted");
  } catch (error) {
    res.send(error);
  }
};

module.exports = { AddUser, GetUser, UpdateUser, DeleteUser };
