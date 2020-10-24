const store = require('./store');

function listUsers() {
  return store.list();
}

function getUser(id) {
  return store.get(id)
}

function addUser(name) {
  if (!name) {
    return Promise.reject('[Controller Error]: Invalid Name')
  }

  const user = {
    name,
  }

  return store.add(user);
}

module.exports = {
  listUsers,
  getUser,
  addUser,
}