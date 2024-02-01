// this helps to use async and a wait in fs function
// const fs = require("fs").promises;
const store = require("../Service/Product");

const AddProduct = async (req, res) => {
  const data = [
    {
      id: 1,
      name: "Samsung S24",
      price: 250000,
      description:
        "Galaxy S24 Ultra is IP68 water and dust resistant — so you're ready for every adventure, puddles and all. *Galaxy S24, S24+ and S24 Ultra are rated as IP68.",
      quantity: 5,
      product_type: "Electronics",
    },

    {
      id: 2,
      name: "Gloves",
      price: 250,
      description:
        " LS2 Chaki Black Street Gloves with Knuckle Protection · LS2 Jet Man 2 Black Red Textile Winter, Wind proof & Waterproof Gloves with Knuckle Protection.",
      quantity: 10,
      product_type: "Clothing",
    },
    {
      id: 3,
      name: "LifeBoy",
      price: 19.99,
      description:
        " Lifebuoy Neem Aloe Vera Nature Protect · Lifebuoy Total 10 Germ Guard Soap Bar",
      quantity: 75,
      product_type: "Grocery",
    },
    {
      id: 4,
      name: "Asus Zenbook 14",
      price: 144000,
      description:
        "This ultraportable laptop has the day-long battery life you need, amplifying your efficiency with the top-tier Intel® processor, and ASUS Lumina OLED ...",
      quantity: 3,
      product_type: "Electronics",
    },
    {
      id: 5,
      name: "Arduino",
      price: 1700,
      description:
        "Arduino is an Italian open-source hardware and software company, project, and user community that designs and manufactures single-board microcontrollers and ...",
      quantity: 30,
      product_type: "Electronics",
    },
    {
      id: 6,
      name: "Hoodies",
      price: 1750,
      description:
        "Best deals on hoodies for men price in Nepal from Daraz np. Shop high quality sweatshirts for men, black & white hoodie, plain hoodies, pullover hoodie at ...",
      quantity: 90,
      product_type: "Clothing",
    },
    {
      id: 7,
      name: "Wai Wai Noodles",
      price: 20,
      description:
        "Noodles are a type of food made from unleavened dough which is either rolled flat and cut, stretched, or extruded, into long strips or strings.",
      quantity: 60,
      product_type: "Grocery",
    },
    {
      id: 8,
      name: "Samsung S22",
      price: 95000,
      description:
        "Samsung Galaxy S21 Ultra 5G Android smartphone. Announced Jan 2021. Features 6.8″ display, Exynos 2100 chipset, 5000 mAh battery, 512 GB storage, 16 GB RAM, ...",
      quantity: 45,
      product_type: "Electronics",
    },
    {
      id: 9,
      name: "Half Zip Hoodies",
      price: 1200,
      description:
        "Best deals on hoodies for men price in Nepal from Daraz np. Shop high quality sweatshirts for men, black & white hoodie, plain hoodies, pullover hoodie at ...",
      quantity: 80,
      product_type: "Clothing",
    },
    {
      id: 10,
      name: "Current Noodles",
      price: 50,
      description:
        "Current Instant Noodles ... Instant pre-cooked noodles boasting a flavorful blend of vegetables for a quick, tasty meal. features-ic. CURRENT CHEESE CHICKEN PIZZA.",
      quantity: 55,
      product_type: "Grocery",
    },
  ];
  try {
    const add = await store.create(data);
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
  const id = parseInt(req.query.id) || 10;

  // update the value here
  const data = {
    id: id,
    name: "Updated Name",
    price: 200,
    description: "This is description of updated product",
    quantity: 55,
    product_type: "This is updated type",
  };
  try {
    const update = await store.update(id, data);
    res.send(update);
  } catch (error) {
    res.send(error);
  }
};

const EditProduct = async (req, res) => {
  const id = parseInt(req.query.id) || 9;
  try {
    const edit = await store.edit(id);
    res.send(edit);
  } catch (error) {
    res.send(error);
  }
};

const DeleteProduct = async (req, res) => {
  const id = parseInt(req.query.id) || 2;
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
  const id = parseInt(req.query.id);
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
