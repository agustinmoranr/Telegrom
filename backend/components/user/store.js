const Model = require('./model');

function listUsers() {
  const users = Model.find();
  return users
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    const user = Model.findById({
      _id: id
    })
    
    return resolve(user);
  })
}

function addUser(user) {
  const newUser = new Model(user);
  return newUser.save();
};

module.exports = {
  list: listUsers,
  get: getUser,
  add: addUser,
};