const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res) {
  const userId = req.query.user || null;
  controller.listChats(userId)
    .then((chats) => {
      response.success(req, res, chats, 200);
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.get('/:id', function (req, res) {
  const chatId = req.params.id;
  controller.getChat(chatId)
    .then((chats) => {
      response.success(req, res, chats, 200);
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/', function (req ,res) {
  const users = req.body.users
  controller.addChat(users)
    .then((chat) => {
      response.success(req, res, chat, 201);
    })
    .catch((error) => {
      response.error(req, res, 'Unexpected Error', 500, error);
    })
});

module.exports = router;