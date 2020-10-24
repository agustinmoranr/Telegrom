const model = require('./model');
const Model = require('./model');

function listChats(userId) {
  return new Promise((resolve, reject) => {
    let filter = {};
  
    if(userId !== null) {
      filter = {
        users: userId
      }
    }

    Model.find(filter)
      .populate('users')
      .exec((error, populated) => {
        if (error) {
          return reject(error);
        };
        resolve(populated);
      })
  })
}

async function getChat(id) {
  return new Promise((resolve, reject) => {
    model.findById({ _id: id })
      .populate('users')
      .exec(async (error, populated) => {
        if(error) {
          return reject(error)
        }
        resolve(populated)
      })
  })
}

function addChat(chat) {
  const newChat = new Model(chat)
  return newChat.save();
};

module.exports = {
  add: addChat,
  list: listChats,
  get: getChat,
};