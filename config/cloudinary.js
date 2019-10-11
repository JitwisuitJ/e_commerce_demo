const cloudinary = require('cloudinary').v2;
const config = require('config');
const cloud_name = config.get('cloudinary_cloud_name');
const api_key = config.get('cloudinary_api_key');
const api_secret = config.get('cloudinary_api_secret');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
});

module.exports = cloudinary;
