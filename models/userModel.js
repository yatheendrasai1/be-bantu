const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
      },
  name: {
    type: String,
    required: true
  },
  // Add other user fields as needed
},{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;