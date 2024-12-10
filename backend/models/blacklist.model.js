const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1h' }, // Automatically remove token after 1 hour
  },
});

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

module.exports = Blacklist;
