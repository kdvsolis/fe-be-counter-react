const express = require('express');
const counterController = require('../api/controllers/counter.controller');

const apiCounter = express.Router();

apiCounter.post('/set-counter', async (req, res) => counterController.setCounterValue(req, res));
apiCounter.get('/get-counter', async (req, res) => counterController.getCounterValue(req, res));

module.exports = apiCounter;