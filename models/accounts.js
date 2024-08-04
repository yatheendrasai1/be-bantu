const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

accountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

accountSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;