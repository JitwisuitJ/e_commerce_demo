const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const Stripe = require('stripe');
const config = require('config');

const Cart = require('../../models/Cart');

const { ObjectId } = mongoose.Types;

// @route   GET api/cart/
// @desc    Get a user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product'
    });

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
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
    let newCart;
    // If product already in cart, then update its quantity
    if (productExistsinCart) {
      newCart = await Cart.findOneAndUpdate(
        {
          _id: cart.id,
          'products.product': productId
        },
        { $inc: { 'products.$.quantity': quantity } },
        { new: true }
      ).populate({
        path: 'products.product',
        model: 'Product'
      });
    } else {
      // If not, add new product with given quantity
      const newProduct = { product: productId, quantity };
      newCart = await Cart.findOneAndUpdate(
        {
          _id: cart.id
        },
        { $addToSet: { products: newProduct } },
        { new: true }
      ).populate({
        path: 'products.product',
        model: 'Product'
      });
    }

    return res.status(200).json(newCart.products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   DELETE api/cart/deleteproduct/:productId
// @desc    Delete product in user's cart
// @access  Private
router.delete('/deleteproduct/:productId', auth, async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: 'products.product',
      model: 'Product'
    });

    return res.status(200).json(cart.products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   POST api/cart/checkout
// @desc    Checkout product in user's cart
// @access  Private
router.post('/checkout', auth, async (req, res) => {
  const paymentData = req.body;
  const userId = req.user.id;
  const stripe = Stripe(config.get('stripe_secret_key'));
  let totalPrice = 0;

  try {
    // Check total Price
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product'
    });

    if (cart) {
      cart.products.forEach(product => {
        totalPrice += product.quantity * product.product.price;
      });
    }

    // Check Stripe's Customer
    const alreadyCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1
    });

    const isExistingCustomer = alreadyCustomer.data.length > 0;

    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      });
    }

    const customer = isExistingCustomer
      ? alreadyCustomer.data[0].id
      : newCustomer.id;

    // Charge
    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: totalPrice * 100,
      customer,
      description: `Checkout | ${paymentData.email} | ${paymentData.id}`
    });

    // Clear Product in Cart
    const newCart = await Cart.findOneAndUpdate(
      { _id: cart._id },
      { $set: { products: [] } },
      { new: true }
    );

    res.status(200).json(newCart.products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

module.exports = router;
