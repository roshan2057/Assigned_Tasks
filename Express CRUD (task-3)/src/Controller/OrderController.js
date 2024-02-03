const store = require("../Service/Order");

const OrderHistory = async (req, res) => {
  try {
    const data = await store.read();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

const Add_to_cart = async (req, res) => {
  const userid = req.query.id;
  const item = { product: '65bbb5c5ed1797f1b04eaeff', quantity: 5, price: 40 };
  try {
    const add = await store.add_tocart(userid, item);
    res.send(add);
  } catch (error) {
    res.send(error);
  }
};

const Place_Order = async (req, res) => {
  const threshold_price = 200;
  const userid = req.query.id;
  try {
    const data = await store.place_order(threshold_price, userid);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  OrderHistory,
  Add_to_cart,
  Place_Order,
};
