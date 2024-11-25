const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productID: String,
  name: String,
  description: String,
  price: String,
  createdDate: Date,
  address: String,
  customerName: String,
  size: String
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
