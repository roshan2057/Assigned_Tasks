const fs = require("fs").promises;
const file_path = "./src/JsonFile/order.json";

// storing cart items in a memory for now
const Cart = [];

const OrderHistory = async (req, res) => {
  try {
    const Orders = JSON.parse(await fs.readFile(file_path, "utf-8"));
    res.send(Orders);
  } catch (error) {
    res.send(error);
  }
};

const Add_to_cart = (req, res) => {
  const userid = 3;
  const item = { product: 10, quantity: 5, price: 40 };
  const cartitem = Cart.find((data) => data.userid === userid);
  if (cartitem) {
    cartitem.items.push(item);
    cartitem.amount = cartitem.amount + item.quantity * item.price;
  } else {
    const data = {
      userid: userid,
      items: [item],
      amount: item.quantity * item.price,
    };
    Cart.push(data);
  }

  res.send(Cart);
};

const Place_Order = async (req, res) => {
  const threshold_price = 200;
  const userid = 3;

  const cartitem = Cart.find((data) => data.userid === userid);

  if (cartitem) {
    if (cartitem.amount < threshold_price) {
      return res.send("Threshold minimum price not meet");
    }
    // console.log(cartitem)
    try {
      const data = JSON.parse(await fs.readFile(file_path, "utf-8"));
      const userorder = data.find((data) => data.userid === userid);
      // adding product to order list from the cart items
      const totalorder = [...userorder.items, ...cartitem.items];
      userorder.items = totalorder;
      userorder.amount = userorder.amount + cartitem.amount;
      //making new array with updated items and amont
      const newdata = data.map((order) => {
        return order.userid === userorder.userid ? userorder : order;
      });
      // console.log(newdata)
      await fs.writeFile(file_path, JSON.stringify(newdata));

      res.send(newdata);
    } catch {
      await fs.writeFile(file_path, "[" + JSON.stringify(cartitem) + "]");
      res.send(cartitem);
    }
    //removing the users items from cart
    for (let i = 0; i <= Cart.length - 1; i++) {
      if (Cart[i].userid === userid) {
        Cart.splice(i, 1);
      }
    }
  } else {
    return res.send("There is no items in the cart");
  }
};

module.exports = {
  OrderHistory,
  Add_to_cart,
  Place_Order,
};
