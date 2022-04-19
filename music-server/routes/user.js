const express = require('express');
const userContorller = require('../controllers/userController');

const router = express.Router();

router.get('/playlist', userContorller.getPlaylist);
router.put('/playlist', userContorller.addToPlaylist);
router.delete('/playlist', userContorller.removeFromPlaylist);


module.exports = router;