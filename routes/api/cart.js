const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');

const Cart = require('../../models/Cart');
const User = require('../..//models/User');

const { ObjectId } = mongoose.Types;

// @route   GET api/cart/
// @desc    Get a user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   PUT api/cart/addproduct
// @desc    Add product to user's cart
// @access  Private
router.put('/addproduct', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    const productExistsinCart = cart.products.some(item =>
      ObjectId(productId).equals(item.product)
    );

    // If product already in cart, then update its quantity
    if (productExistsinCart) {
      await Cart.findOneAndUpdate(
        {
          _id: cart.id,
          'products.product': productId
        },
        { $inc: { 'products.$.quantity': quantity } }
      );
    } else {
      // If not, add new product with given quantity
      const newProduct = { product: productId, quantity };
      await Cart.findOneAndUpdate(
        {
          _id: cart.id
        },
        { $addToSet: { products: newProduct } }
      );
    }

    return res.status(200).json({ msg: 'Cart updated' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   DELETE api/cart/deleteproduct
// @desc    Delete product from user's cart
// @access  Private
router.delete('/deleteproduct', auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    );

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
