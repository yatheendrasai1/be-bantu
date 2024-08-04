const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../models/accounts');
const User = require('../models/userModel');

const router = express.Router();

const JWT_SECRET = 'c0e8e27a9ac5b59b826b256e0a74ffb272356ddfb7129b5589e74af298409258'; // Use a strong secret key

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const account = new Account({ email, password });
    await account.save();

    const user = new User({ accountId: account._id, name });
    await user.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const isMatch = await account.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ accountId: account._id }, JWT_SECRET, { expiresIn: '1h' });

    console.log("%% ~ router.post ~ token:", token)
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in' });
  }
});

module.exports = router;
