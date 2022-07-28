const express = require("express");
const app = express.Router();
const userController = require("../controllers/user");
const productController = require("../controllers/product");



app.get("/", productController.getProducts);
app.get("/find/:productId", productController.getProduct);
app.use(userController.authorize);
app.post("/", userController.adminPrivilage, productController.createProduct);
app.put("/:productId", userController.adminPrivilage,productController.updateProduct);
app.delete("/:productId", userController.adminPrivilage, productController.deleteProduct);

module.exports = app;
