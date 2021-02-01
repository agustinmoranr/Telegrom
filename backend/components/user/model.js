const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema ({
  name: {
    type: String,
    require: true,
  }
});

const model = mongoose.model('user', mySchema);
console.log(model)
module.exports = model;