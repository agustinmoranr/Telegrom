const Model = require('./model');

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
};

function getMessage(filterChat) {
  return new Promise((resolve, reject) => {
  let filter = {};

  if (filterChat !== null) {
    filter = { chat: filterChat }
  }

    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if (error) {
          return reject(error);
        };
        resolve(populated);
      })
  });
};

function updateMessage(id, message) {
  return new Promise((resolve, reject) => {
    const updatedMessage = Model.findOneAndUpdate(
      { _id: id },
      { message },
      { new: true }
    )

    resolve(updatedMessage)
  })
}

function deleteMessage(id) {
  return Model.deleteOne({
    _id: id
  });
}

module.exports = {
  add: addMessage,
  list: getMessage,
  update: updateMessage,
  remove: deleteMessage,
};