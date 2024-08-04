const jwt = require('jsonwebtoken');
const JWT_SECRET = 'c0e8e27a9ac5b59b826b256e0a74ffb272356ddfb7129b5589e74af298409258';

module.exports = function (req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log("%% ~ token: after : ", token)

  if (!token) {
    return res.status(401).send({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.accountId = decoded.accountId;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' , err : error});
  }
};
