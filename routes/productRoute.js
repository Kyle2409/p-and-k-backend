const express = require('express');
const Product = require('../models/productModel')
const router = express.Router();
const { authRole, authUser } = require('../middleware/auth')
const { getProduct } = require('../middleware/finders')

// Getting All
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).send(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Getting One
router.get('/:id', getProduct, (req, res) => {
  res.send(res.product);
});

//Creating A Product
router.post('/', authUser, authRole(), async (req, res) => {
    const {title ,price ,description, category, img} = req.body
    const product = new Product({
        title,
        price,
        description,
        category,
        creator: req.user._id,
        img
    });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//Updating A Product
router.put('/:id', [ getProduct, authUser, authRole() ], async (req, res) => {
    if (req.user._id !== res.product.creator)
        res.status(400).json({ msg: "Not permitted" })
    const {title, price, category, img, description} = req.body;
    if (title) { res.product.title = title };
    if (price) { res.product.price = price };
    if (category) { res.product.category = category };
    if (img) { res.product.img = img };
    if (description) { res.product.description = description };
    try {
        const updatedProduct = await res.product.save();
        res.status(201).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ msg: err.message });
  }
});

//Deleting One
router.delete('/:id',  [ getProduct, authUser, authRole() ], async (req, res) => {
    if (req.user._id !== res.product.creator)
        res.status(400).json({ msg: "You do not have the proper authentication for that" })
    try {
    await res.product.remove();
    res.json({ message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;