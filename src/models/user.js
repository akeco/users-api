const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:  String,
    name: String,
    password: String,
    contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });

  module.exports = mongoose.model('User', userSchema);
