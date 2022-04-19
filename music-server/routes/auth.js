const express = require('express');
const { serializeUser } = require('passport');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(200);
});

// To give the response to only the authenticated users, do this
// router.get('/', async (req, res) => {
//     if(req.user) {
//         // Give your logic
//     }
//     else {
//         res.status(403).send({msg: 'Not Authenticated'});
//     }
// });

module.exports = router;