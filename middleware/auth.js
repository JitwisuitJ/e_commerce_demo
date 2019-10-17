const jwt = require('jsonwebtoken');
const config = require('config');

// Authenticate token from request, Then assisgn user to request, if No Token or Invalid Token return error
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
  }
};

module.exports = auth;
