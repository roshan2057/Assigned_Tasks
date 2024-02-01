const store = require("../Service/User");

const AddUser = async (req, res) => {
  const user = {
    name: "kho",
    email: "rohsan@gmail.com",
    password: "itsnotencrypted",
  };

  try {
    const add = await store.create(user);
    res.send(add);
  } catch (error) {
    res.send(error);
  }
};

const GetUser = async (req, res) => {
  try {
    const data = await store.read();
    res.send(data);
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
    const update = await store.update(id, newvalue);
    res.send(update);
  } catch (error) {
    res.send(error);
  }
};

const DeleteUser = async (req, res) => {
  const id = parseInt(req.query.id) || 1;
  try {
    const remove = await store.delete(id);
    res.send(remove);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { AddUser, GetUser, UpdateUser, DeleteUser };
