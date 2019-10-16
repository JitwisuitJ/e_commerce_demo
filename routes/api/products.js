const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const cloudinary = require('../../config/cloudinary');

const Product = require('../../models/Product');
const User = require('../..//models/User');
const Cart = require('../../models/Cart');

// @route   GET api/products
// @desc    Get all products
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    return res.json(products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   GET api/products/search/:productName
// @desc    Get search products
// @access  Private
router.get('/search/:productName', auth, async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.productName, $options: 'i' }
    }).sort({ date: -1 });
    return res.json(products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route   POST api/products/create
// @desc    Create a product
// @access  Private
router.post(
  '/create',
  auth,
  [
    check('name', 'Please include a name')
      .not()
      .isEmpty(),
    check('description', 'Please include a description')
      .not()
      .isEmpty(),
    check('price', 'Please include a price')
      .not()
      .isEmpty(),
    check('price', 'Please include a price in number format').isNumeric()
  ],
  async (req, res) => {
    // Validation
    try {
      const user = await User.findById(req.user.id).select('-password');

      if (!checkAdminRole(user.role)) {
        res.status(401).json({ msg: 'Your role cannot update a product' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (!req.files) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Plaese include an image' }] });
      }

      const { mimetype } = req.files.image;

      if (!checkIfFileIsImage(mimetype)) {
        return res.status(400).json({
          errors: [
            { msg: 'Plaese make sure type of file is either .png or .jpeg' }
          ]
        });
      }

      // Set Product detail
      const { name, price, description } = req.body;
      let newProduct = {
        name,
        price,
        description,
        imageUrl: ''
      };

      // Upload Image
      const { image } = req.files;

      await cloudinary.uploader.upload(
        image.tempFilePath,
        { transformation: [{ width: 210, height: 210, crop: 'pad' }] },
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
          }
          newProduct.imageUrl = result.url;
        }
      );

      // Save to DB
      newProduct = new Product(newProduct);
      await newProduct.save();

      res.json(newProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route   PUT api/products/update/:productId
// @desc    Update a product
// @access  Private
router.put(
  '/update/:productId',
  auth,
  [
    check('price', 'Please include a price in number format')
      .isNumeric()
      .optional()
  ],
  async (req, res) => {
    // Validation
    try {
      const user = await User.findById(req.user.id).select('-password');

      if (!checkAdminRole(user.role)) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Your role cannot update a product' }] });
      }

      let updatedProduct = await Product.findById(req.params.productId);

      if (!updatedProduct) {
        return res.status(400).json({
          errors: [{ msg: 'Product not found' }]
        });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check for image updated
      let imageUrl;

      if (req.files) {
        const { mimetype } = req.files.image;

        if (!checkIfFileIsImage(mimetype)) {
          return res.status(400).json({
            errors: [
              { msg: 'Plaese make sure type of file is either .png or .jpeg' }
            ]
          });
        }

        const { image } = req.files;

        await cloudinary.uploader.upload(
          image.tempFilePath,
          { transformation: [{ width: 210, height: 210, crop: 'pad' }] },
          (err, result) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ errors: [{ msg: 'Server Error' }] });
            }
            imageUrl = result.url;
          }
        );
      }
      // Check field updated
      const { name, price, description } = req.body;
      if (!imageUrl && !name && !price && !description) {
        return res.status(400).json({
          errors: [{ msg: 'Plaese Include at least one filed' }]
        });
      }

      const productFileds = {};
      if (name) productFileds.name = name;
      if (price) productFileds.price = price;
      if (description) productFileds.description = description;
      if (imageUrl) productFileds.imageUrl = imageUrl;

      updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        productFileds,
        { new: true }
      );

      return res.json(updatedProduct);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ errors: [{ msg: 'Product not found' }] });
      }
      console.error(err);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route   DELETE api/products/delete/:productId
// @desc    Delete a product
// @access  Private
router.delete('/delete/:productId', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const { productId } = req.params;

  if (!checkAdminRole(user.role)) {
    res
      .status(401)
      .json({ errors: [{ msg: 'Your role cannot delete a product' }] });
  }

  try {
    // Delete Product
    const removeProduct = await Product.findByIdAndRemove(productId);

    // Delete Product in Carts
    await Cart.updateMany(
      {
        'products.product': productId
      },
      { $pull: { products: { product: productId } } }
    );
    return res.status(200).json(removeProduct);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// Helper Function

const checkAdminRole = role => {
  if (role !== 'admin') {
    return false;
  } else return true;
};

const checkIfFileIsImage = mimeType => {
  if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
    return false;
  } else return true;
};

module.exports = router;
