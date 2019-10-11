const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  products: [
    {
      product: {
        type: ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
