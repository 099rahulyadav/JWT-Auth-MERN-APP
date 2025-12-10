const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('products', ProductSchema);    //collection name will be 'products'
module.exports = ProductModel;