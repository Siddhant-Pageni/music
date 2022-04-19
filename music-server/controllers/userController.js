const User = require("../models/user");

exports.getPlaylist = (req, res, next) => {
    console.log("userController > getPlaylist");
    console.log(req.user);
    if (req.user) {
        console.log(req.user["playlist"]);
        res.json(req.user["playlist"]);
    }
};
exports.addToPlaylist = (req, res, next) => {
    console.log("userController > addToPlaylist");
    console.log(req.user);
    if (req.user) {
        console.log(typeof req.user);
        User.addToPlaylist(req.user.username, req.body.musicId);
        console.log(User.fetchAll());
        res.send(200);
    } else {
        res.status(403).send({ msg: "Not Authenticated" });
    }
};

exports.removeFromPlaylist = (req, res, next) => {
    console.log("userController > removeFromPlaylist");
    if (req.user) {
        User.removeFromPlaylist(req.user.username, req.body.musicId);
        console.log(User.fetchAll());
        res.send(200);
    } else {
        res.status(403).send({ msg: "Not Authenticated" });
    }
};
