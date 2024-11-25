const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    createdTime: String,
    site: String,
    order: String,
    productID: String,
    name: String,
    description: String,
    price: String,
    createdDate: Date,
    address: String,
    customerName: String,
    size: String
  });

const Visitor = mongoose.model('visitors', visitorSchema);

module.exports = Visitor;
