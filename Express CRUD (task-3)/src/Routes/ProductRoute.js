const express = require("express");
const router = express.Router();
const {
  AddProduct,
  GetProduct,
  UpdateProduct,
  EditProduct,
  DeleteProduct,
  SearchProduct,
  UpdateQuantity,
  OutOfStock,
} = require("../Controller/ProductController");

// CREATE
router.post("/create_product", AddProduct);

// READ
router.get("/read_products", GetProduct);

// UPDATE i.e put
router.put("/update_product", UpdateProduct);

// PATCH
router.patch("/patch_product", EditProduct);

// DELETE
// Create an API to delete a product by its id
router.delete("/delete_product", DeleteProduct);

// SEARCH API

// Create an API to search among the products. Search by either name or description. Sort by price,
// filter by product_type (Product types might be Electronics, Grocery, Clothing, etc.)

router.get("/search_product", SearchProduct);

// UPDATE PRODUCT QUANTITY
// Create an API to update the product quantity
router.patch("/update_quantity", UpdateQuantity);

//OUT OF STOCK
// Create an API to list all the out of stock products (i.e. quantity less than 5)
router.get("/outofstock_product", OutOfStock);

module.exports = router;
