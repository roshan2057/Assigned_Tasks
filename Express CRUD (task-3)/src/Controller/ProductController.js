// this helps to use async and a wait in fs function
// const fs = require("fs").promises;
const store = require("../Service/Product");

const AddProduct = async (req, res) => {

  const product =req.body;
  try {
    const add = await store.create(product);
    res.send(add);
  } catch (error) {
    res.send(error);
  }
};

const GetProduct = async (req, res) => {
  try {
    const data = await store.read();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

const UpdateProduct = async (req, res) => {
  const id = req.query.id || "65bbb5c5ed1797f1b04eaeff";
  const data = req.body
  try {
    const update = await store.update(id, data);
    res.send(update);
  } catch (error) {
    res.send(error);
  }
};

const EditProduct = async (req, res) => {
  const id = req.query.id || "65bbb5d46a97d4dd2990de79";
  try {
    const data = req.body
    const edit = await store.edit(id,data);
    res.send(edit);
  } catch (error) {
    res.send(error);
  }
};

const DeleteProduct = async (req, res) => {
  const id = req.query.id || 2;
  try {
    const remove = await store.delete(id);
    res.send(remove);
  } catch (error) {
    res.send(error);
  }
};

const SearchProduct = async (req, res) => {
  const search_value = req.query.search || "s24";
  const type = req.query.type;
  const sortby = req.query.sortby;
  try {
    const data = await store.search(search_value, type, sortby);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

const UpdateQuantity = async (req, res) => {
  const id = req.query.id;
  const newquantity = parseInt(req.query.quantity);
  try {
    const update = await store.update_quantity(id, newquantity);
    res.send(update);
  } catch (error) {
    res.send(error);
  }
};

const OutOfStock = async (req, res) => {
  try {
    const quantity = 5;
    const stock = await store.stock(quantity);
    res.send(stock);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  AddProduct,
  GetProduct,
  UpdateProduct,
  EditProduct,
  DeleteProduct,
  SearchProduct,
  UpdateQuantity,
  OutOfStock,
};
