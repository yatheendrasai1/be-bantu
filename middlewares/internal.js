const jwt = require('jsonwebtoken');
const JWT_SECRET = 'f5bc4665-c0b4-0k2k-20bi-5d1445425d5b'; // Use the same secret key

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
