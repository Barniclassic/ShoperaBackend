const OrderModel = require("../models/order");

// CREATE ORDER
exports.createOrder = async (req, res) => {

  const newOrder = new OrderModel(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.orderId);
    res.status(200).send("SUCCESSFULLY DELETED ORDER");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL USER ORDERS
exports.getOrder = async (req, res) => {
  try {
    const orders = await OrderModel.findOne({ userId: req.params.userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL ORDERS FOR ADMIN
exports.getOrders = async (req, res) => {
  try {
    let orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
