const express = require('express')
const app = express.Router();
const userController = require("../controllers/user")
const paymentController = require("../controllers/checkout")

const stripe = require("stripe");

// app.use(userController.authorize);

app.post("/payment",  paymentController.addPayment)


module.exports = app;