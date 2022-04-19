const express = require('express');
const musicController = require('../controllers/musicController');

const router = express.Router();

router.get('/', musicController.getAllMusic);


module.exports = router;