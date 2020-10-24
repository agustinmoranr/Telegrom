const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MySchema = new Schema({
  users: [{
    type: Schema.ObjectId,
    ref: 'user'
  }],
  date: Date,
})

const model = mongoose.model('chat', MySchema);

module.exports = model;