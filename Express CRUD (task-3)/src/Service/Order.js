// storing cart items in a memory for now
const Cart = [];
class FileStore {
  constructor() {
    this.fs = require("fs").promises;
    this.file_path = "./src/JsonFile/order.json";
  }
  async read() {
    try {
      const Orders = JSON.parse(
        await this.fs.readFile(this.file_path, "utf-8")
      );
      return Orders;
    } catch (error) {
      throw error;
    }
  }
  async add_tocart(userid, item) {
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

    return Cart;
  }
  async place_order(threshold_price, userid) {
    const cartitem = Cart.find((data) => data.userid === userid);

    if (cartitem) {
      if (cartitem.amount < threshold_price) {
        return "Threshold minimum price not meet";
      }
      // console.log(cartitem)
      try {
        const data = JSON.parse(
          await this.fs.readFile(this.file_path, "utf-8")
        );
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
        await this.fs.writeFile(this.file_path, JSON.stringify(newdata));

        res.send(newdata);
      } catch {
        await this.fs.writeFile(
          this.file_path,
          "[" + JSON.stringify(cartitem) + "]"
        );
        return cartitem;
      }
      //removing the users items from cart
      for (let i = 0; i <= Cart.length - 1; i++) {
        if (Cart[i].userid === userid) {
          Cart.splice(i, 1);
        }
      }
    } else {
      return "There is no items in the cart";
    }
  }
}

class DBStore {
  constructor() {
    this.Order = require("../Schema/Order");
  }
  read() {
    return this.Order.find()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  add_tocart(userid, item) {
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

    return Cart;
  }
  async place_order(threshold_price, userid) {
    const cartitem = Cart.find((data) => data.userid === userid);

    if (cartitem && Array.isArray(cartitem.items)) {
      if (cartitem.amount < threshold_price) {
        return "Threshold minimum price not met";
      }

      const existingOrder = await this.Order.findOne({ userid: userid });
      if (existingOrder) {
        const update = await this.Order.updateOne(
          { userid: existingOrder.userid },
          { $push: { items: { $each: cartitem.items } } },
          { amount: existingOrder.amount + cartitem.amount }
        );

        //removing the users items from cart
        for (let i = 0; i <= Cart.length - 1; i++) {
          if (Cart[i].userid === userid) {
            Cart.splice(i, 1);
          }
        }
        return update;
      }

      const order = {
        userid: userid,
        items: cartitem.items,
        amount: cartitem.amount,
      };

      //removing the users items from cart
      for (let i = 0; i <= Cart.length - 1; i++) {
        if (Cart[i].userid === userid) {
          Cart.splice(i, 1);
        }
      }
      return this.Order.create(order);
    } else {
      return "No item in cart";
    }
  }
}

const File = new FileStore();
const DB = new DBStore();

module.exports = process.env.STORE_TO === "FS" ? File : DB;
