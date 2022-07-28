const express = require('express')
const app = express.Router();
const userController = require("../controllers/user")
const cartController = require("../controllers/cart")

app.use(userController.authorize);


app.get("/", userController.adminPrivilage, cartController.getCarts)
app.get("/find/:userId", cartController.getCart)
app.post("/",  cartController.createCart)
app.put("/:cartId", cartController.updateCart);
app.delete("/:cartId", cartController.deleteCart);

module.exports = app;