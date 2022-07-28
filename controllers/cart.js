const CartModel = require("../models/cart");

// CREATE CART
exports.createCart = async (req, res) => {
  const newCart = new CartModel(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE CART
exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      req.params.cartId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE CART
exports.deleteCart = async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.cartId);
    res.status(200).send("SUCCESSFULLY DELETED CART");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET USER CART
exports.getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({userId: req.params.userId});
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL CARTS FOR ADMIN
exports.getCarts = async (req, res) => {
  try {
    let carts = await CartModel.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};
