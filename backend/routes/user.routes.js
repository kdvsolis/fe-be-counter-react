const express = require('express');
const userController = require('../api/controllers/user.controller');
const { validateToken } = require('../middlewares/validate-access-token.middleware');

const apiUser = express.Router();

apiUser.post('/check-user', async (req, res) => userController.checkUser(req, res));

module.exports = apiUser;
