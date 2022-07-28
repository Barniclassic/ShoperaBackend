const express = require('express')
const app = express.Router();
const userController = require("../controllers/user")


app.post("/signup",  userController.signup)
app.post("/signin",  userController.signin)
app.use(userController.authorize);
app.use(userController.adminPrivilage)
app.get("/", userController.getUsers)
app.get("/find/:userId", userController.getUser)
app.post("/adduser",  userController.createUser)
app.put("/:userId", userController.updateUser);
app.delete("/:userId", userController.deleteUser);

module.exports = app;