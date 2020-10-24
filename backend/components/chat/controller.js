const store = require('./store');

function listChats(userId) {
  return store.list(userId);
}

function getChat(chatId) {
  return store.get(chatId);
}

function addChat(users) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(users) || users.length < 2) {
      return reject('[Controller error]: bad request');
    };
  
    const chat = {
      users,
      date: new Date(),
    };
  
    return resolve(store.add(chat));
  })
}

module.exports = {
  addChat,
  listChats,
  getChat,
}