const express = require('express');
const router = express.Router();
const Product = require('../models/products');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    const formattedProducts = products.map(product => {
        return Object.fromEntries(
          Object.entries(product.toObject()).map(([key, value]) => [
            key,
            typeof value === 'string' ? value.toUpperCase() : value
          ])
        );
      });
  
      res.json(formattedProducts);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving products' });
  }
});

router.post('/products', async (req, res) => {
    const { name, description, price, quantity, address, customerName, size, createdDate } = req.body;
    
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        quantity,
        address,
        customerName,
        createdDate,
        size
      });
  
      await newProduct.save();
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  });

  router.delete('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting product', error: err });
    }
  });

module.exports = router;
