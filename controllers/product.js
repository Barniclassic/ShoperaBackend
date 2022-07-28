const ProductModel = require("../models/product");

exports.createProduct = async (req, res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  console.log(req.params.productId)
  try {
    await ProductModel.findByIdAndDelete(req.params.productId);
    res.status(200).send("SUCCESSFULLY DELETED PRODUCT");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET A PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let products;

    if (queryNew) {
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
    } else if (queryCategory) {
      products = await ProductModel.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await ProductModel.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
