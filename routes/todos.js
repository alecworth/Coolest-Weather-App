const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');

// Define weather route
router.get('/', todosController.getWeather);

module.exports = router;
