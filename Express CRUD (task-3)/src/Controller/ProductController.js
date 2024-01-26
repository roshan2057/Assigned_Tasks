const fs = require("fs");
// this helps to use async and a wait in fs function
// const fs = require("fs").promises;

const product_path = "./src/JsonFile/product.json";

const AddProduct = (req, res) => {
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
  fs.writeFile(product_path, JSON.stringify(data), (error) => {
    if (error) {
      console.error(error);
    }
    res.send("Created");
  });
};

const GetProduct = (req, res) => {
  fs.readFile(product_path, "utf-8", (error, result) => {
    if (error) {
      return res.send(error);
    }
    res.send(JSON.parse(result));
  });
};

const UpdateProduct = (req, res) => {
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

  fs.readFile(product_path, "utf-8", (error, result) => {
    if (error) {
      return res.send(error);
    }
    const newdata = JSON.parse(result).map((product) => {
      return product.id == id ? data : product;
    });

    fs.writeFile(product_path, JSON.stringify(newdata), (error) => {
      if (error) {
        console.error(error);
      }
      res.send("Updated");
    });
  });
};

const EditProduct = (req, res) => {
  const id = parseInt(req.query.id) || 9;

  fs.readFile(product_path, "utf-8", (error, result) => {
    if (error) {
      return res.send(error);
    }
    const data = JSON.parse(result).find((product) => {
      return product.id === id;
    });

    // update the value here
    data.price = 1000;
    data.name = "Full Sleev Hoodies";

    const newdata = JSON.parse(result).map((product) => {
      return product.id == id ? data : product;
    });

    fs.writeFile(product_path, JSON.stringify(newdata), (error) => {
      if (error) {
        console.error(error);
      }
      res.send("patched sucessfull");
    });
  });
};

const DeleteProduct = (req, res) => {
  const id = parseInt(req.query.id) || 2;

  fs.readFile(product_path, "utf-8", (error, result) => {
    if (error) {
      return res.send(error);
    }
    const newdata = JSON.parse(result).filter((product) => {
      return product.id !== id;
    });
    fs.writeFile(product_path, JSON.stringify(newdata), (error, data) => {
      if (error) {
        return res.send(error);
      }
      res.send("Deleted sucessfully");
    });
  });
};

const SearchProduct = (req, res) => {
  const search_value = req.query.search || "s24";
  const type = req.query.type;
  const sortby = req.query.sortby;

  console.log(search_value);

  fs.readFile(product_path, "utf-8", (error, result) => {
    if (error) {
      return res.send(error);
    }
    let filter_result = JSON.parse(result).filter(
      (product) =>
        product.name.toLowerCase().includes(search_value.toLowerCase()) ||
        product.description.toLowerCase().includes(search_value.toLowerCase())
    );

    // sort by price
    if (sortby.toLowerCase() == "price") {
      filter_result = filter_result.sort((a, b) => {
        return a.price - b.price;
      });
    }

    // filter product by type
    if (type) {
      filter_result = filter_result.filter((product) => {
        return product.product_type.toLowerCase() === type.toLowerCase();
      });
      // console.log(filter_result)
    }
    res.send(filter_result);
  });
};

const UpdateQuantity = (req, res) => {
  const id = parseInt(req.query.id);
  const newquantity = parseInt(req.query.quantity);

  fs.readFile(product_path, "utf-8", (error, result) => {
    if (error) {
      return res.send(error);
    }
    let data = JSON.parse(result).find((product) => {
      // console.log(product)
      return product.id === id;
    });

    // update the value here
    data.quantity = newquantity;

    const newdata = JSON.parse(result).map((product) => {
      return product.id == id ? data : product;
    });

    fs.writeFile(product_path, JSON.stringify(newdata), (error) => {
      if (error) {
        console.error(error);
      }
      res.send("Quantity update sucessfully");
    });
  });
};

const OutOfStock = (req, res) => {
  const quantity = 5;
  fs.readFile(product_path, "utf-8", (error, result) => {
    if (error) {
      return res.send(error);
    }
    const outofstock = JSON.parse(result).filter((product) => {
      return product.quantity < quantity;
    });
    res.send(outofstock);
  });
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
