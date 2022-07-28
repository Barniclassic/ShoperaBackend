const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    categories: [{type: String}],
    size: {type: Array},
    color: [{type: String}],
    price: {type: Number, required: true},
    inStock: {type: Boolean, required: true}
}, {timestamps: true});

const productModel = mongoose.model('Product', ProductSchema)

module.exports = productModel;