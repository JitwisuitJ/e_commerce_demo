const jwt = require('jsonwebtoken');
const config = require('config');

// Authenticate token from request, Then assisgn user to request, if No Token or Invalid Token return error
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log(decoded);
    req.user = decoded.user;

    next();
  } catch (err) {
    console.lo;
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
