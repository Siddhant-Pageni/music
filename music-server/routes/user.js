const express = require('express');
const userContorller = require('../controllers/userController');

const router = express.Router();

router.post('/auth', userContorller.authenticate);
router.get('/playlist', userContorller.getPlaylist);
router.put('/playlist', userContorller.addToPlaylist);
router.delete('/playlist', userContorller.removeFromPlaylist);
router.post('/logout', userContorller.logout);


module.exports = router;