const express = require('express');
const multer = require('multer');
const path = require('path');

const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/files/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
});

const upload = multer({
  storage: storage
}).single('file')

router.get('/', function (req, res) {
  const filterMessages = req.query.chat || null;
  controller.getMessages(filterMessages)
    .then((messages) => {
      response.success(req, res, messages, 200);
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/', upload, function(req, res) {
  controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
  .then((fullMessage) => {
    response.success(req, res, fullMessage, 201);
  })
  .catch(e => {
    response.error(req, res, 'Invalid data', 400, e);
  });
});

router.patch('/:id', function(req, res) {
  controller.updateMessage(req.params.id, req.body.message)
    .then((newMessage) => {
      response.success(req, res, newMessage, 201);
    })
    .catch((error) => {
      response.error(req, res, 'Internal Error', 500, error);
    });
});

router.delete('/:id', function(req, res) {
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, 'Mensaje Eliminado', 200);
    })
    .catch((error) => {
      response.error(req, res, 'Internal Error', 500, error)
    })
});

module.exports = router;
