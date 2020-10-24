const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const router = express.Router();

router.get('/', function (req, res) {
  controller.listUsers()
    .then((users) => {
      response.success(req, res, users, 200);
    })
    .catch((error) => {
      response.error(req, res, 'Internal Error', 500, error)
    });
});

router.get('/:id', function (req, res) {
  controller.getUser(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((error) => {
      response.error(req, res, 'Internal Error', 500, error)
    })
});

router.post('/', function (req, res) {
  controller.addUser(req.body.name)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((error) => {
      response.error(req, res, 'Unexpected Error', 500, error);
    });
});

module.exports = router;