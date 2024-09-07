const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.INTERNAL_API_KEY; // Use the same secret key

module.exports = function (req, res, next) {
  const token = req.header('apiKey');

  if (!token) {
    return res.status(401).send({ error: 'Access denied' });
  }

  try {
    if(token === JWT_SECRET){
        next();
    }
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' , err : error});
  }
};
