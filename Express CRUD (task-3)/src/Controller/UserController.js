const store = require("../Service/User");

const AddUser = async (req, res) => {
  const user = req.body;

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
  const id = req.query.id || "65bbb06dfd618861ee184fff";
  //new value
  const newvalue = req.body;
  try {
    const update = await store.update(id, newvalue);
    res.send(update);
  } catch (error) {
    res.send(error);
  }
};

const DeleteUser = async (req, res) => {
  const id = req.query.id || "65ba63b859e833bc257689ff";
  try {
    const remove = await store.delete(id);
    res.send(remove);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { AddUser, GetUser, UpdateUser, DeleteUser };
