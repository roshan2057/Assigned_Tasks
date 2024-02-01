const { GetIdProduct } = require("./unique_id");

class FileStore {
  constructor() {
    this.fs = require("fs").promises;
    this.product_path = "./src/JsonFile/product.json";
  }

  async create(product) {
    try {
      const data = JSON.parse(
        await this.fs.readFile(this.product_path, "utf-8")
      );
      product.id = await GetIdProduct();
      data.push(product);
      await this.fs.writeFile(this.product_path, JSON.stringify(data));
    } catch {
      product.id = 1;
      await this.fs.writeFile(
        this.product_path,
        "[" + JSON.stringify(product) + "]"
      );
    }
    return "Created in File";

    // try {
    //   await this.fs.writeFile(this.product_path, JSON.stringify(data));
    //   return "Created in File";
    // } catch (error) {
    //   console.error("Error creating:", error.message);
    //   throw error;
    // }
  }

  async read() {
    try {
      const result = await this.fs.readFile(this.product_path, "utf-8");
      return JSON.parse(result);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const result = await this.fs.readFile(this.product_path, "utf-8");
      const products = JSON.parse(result);

      const newData = products.map((product) =>
        product.id === parseInt(id) ? data : product
      );

      await this.fs.writeFile(this.product_path, JSON.stringify(newData));
      return "Updated";
    } catch (error) {
      throw error;
    }
  }

  async edit(id) {
    id = parseInt(id);
    try {
      const result = await this.fs.readFile(this.product_path, "utf-8");
      const products = JSON.parse(result);
      const data = products.find((product) => product.id === id);

      if (!data) {
        return "Product not found";
      }
      data.price = 1000;
      data.name = "Full Sleev Hoodies";
      const newData = products.map((product) =>
        product.id === id ? data : product
      );
      await this.fs.writeFile(this.product_path, JSON.stringify(newData));

      return "Patched successfully FromFile";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async delete(id) {
    try {
      const result = await this.fs.readFile(this.product_path, "utf-8");
      const products = JSON.parse(result);
      const newData = products.filter((product) => product.id !== parseInt(id));
      await this.fs.writeFile(this.product_path, JSON.stringify(newData));

      return "Deleted successfully form File";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async search(search_value, type, sortby) {
    try {
      const result = await this.fs.readFile(this.product_path, "utf-8");
      const products = JSON.parse(result);
      let filterResult = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search_value.toLowerCase()) ||
          product.description.toLowerCase().includes(search_value.toLowerCase())
      );
      if (sortby.toLowerCase() === "price") {
        filterResult = filterResult.sort((a, b) => a.price - b.price);
      }
      if (type) {
        filterResult = filterResult.filter(
          (product) => product.product_type.toLowerCase() === type.toLowerCase()
        );
      }

      return filterResult;
    } catch (error) {
      throw error;
    }
  }
  async update_quantity(id, newquantity) {
    id = parseInt(id);
    try {
      const result = await this.fs.readFile(this.product_path, "utf-8");
      const products = JSON.parse(result);
      const data = products.find((product) => product.id === id);

      if (!data) {
        return "Product not found";
      }
      data.quantity = newquantity;
      const newData = products.map((product) =>
        product.id === id ? data : product
      );
      await this.fs.writeFile(this.product_path, JSON.stringify(newData));

      return "Quantity updated successfully in File";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async stock(quantity) {
    try {
      const result = await this.fs.readFile(this.product_path, "utf-8");
      const products = JSON.parse(result);
      const outOfStock = products.filter(
        (product) => product.quantity < quantity
      );

      return outOfStock;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

class DBStore {
  constructor() {
    this.Product = require("../Schema/Product");
  }
  create(data) {
    return this.Product.create(data)
      .then((data) => {
        return "created in DB";
      })
      .catch((error) => {
        throw error;
      });
  }
  read() {
    return this.Product.find()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  update(id, data) {
    return this.Product.findByIdAndUpdate(id, { $set: data }, { new: true })
      .then((data) => {
        return "updated in DB";
      })
      .catch((error) => {
        throw error;
      });
  }
  edit(id) {
    {
      const data = {
        name: "patch",
        price: 200,
      };
      return this.Product.findByIdAndUpdate(id, { $set: data }, { new: true })
        .then((data) => {
          return "updated in DB";
        })
        .catch((error) => {
          throw error;
        });
    }
  }
  delete(id) {
    return this.Product.findByIdAndDelete(id)
      .then(() => {
        return "Delete From DB";
      })
      .catch((error) => {
        throw error;
      });
  }
  search(search_value, type, sortby) {
    if (sortby == "price") {
      return this.Product.find({
        $or: [
          { name: { $regex: search_value, $options: "i" } },
          { description: { $regex: search_value, $options: "i" } },
        ],
      }).sort({ price: 1 });
    }
    return this.Product.find({
      $or: [
        { name: { $regex: search_value, $options: "i" } },
        { description: { $regex: search_value, $options: "i" } },
      ],
    });
  }
  update_quantity(id, newquantity) {
    return this.Product.findByIdAndUpdate(id, {
      $set: { quantity: newquantity },
    })
      .then(() => {
        return "DB Quantity Updated";
      })
      .catch((error) => {
        throw error;
      });
  }
  stock(quantity) {
    return this.Product.find({ quantity: { $lt: quantity } })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

const File = new FileStore();
const DB = new DBStore();

module.exports = process.env.STORE_TO === "FS" ? File : DB;
