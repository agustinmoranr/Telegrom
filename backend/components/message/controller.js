const store = require('./store');
const { socket } = require('../../socket')

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error('[Message Controller]: No hay usuario o mensaje')
      return reject('Invalid Data');
    };

    let fileUrl = '';

    if(file) {
      fileUrl = 'http://localhost:3000/app/files/' + file.filename;
    };

    const fullMessage = {
      chat: chat,
      user: user, 
      message: message,
      date: new Date(),
      file: fileUrl,
    };

    store.add(fullMessage);

    socket.io.emit('message', fullMessage);

    resolve(fullMessage);
  });
};

function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterChat));
  });
};

function updateMessage(id, message) {
  return new Promise((resolve, reject) => {
    if(!id || !message) {
      reject('Invalid Data');
    };

    const result = store.update(id, message);

    resolve(result);
  });
};

function deleteMessage(id) {
  if(!id) {
    reject('Invalid Id')
  }

  return new Promise((resolve, reject) => {
    store.remove(id)
      .then(() => resolve())
      .catch((e) => {
        reject(e);
      })
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};