const express = require('express')
const app = express.Router();
const userController = require("../controllers/user")
const cartController = require("../controllers/order")

app.use(userController.authorize);

app.get("/", cartController.getOrders)
app.post("/",  cartController.createOrder)
app.get("/find/:userId", cartController.getOrder)
app.put("/:orderId", userController.adminPrivilage, cartController.updateOrder);
app.delete("/:orderId", cartController.deleteOrder);

module.exports = app;