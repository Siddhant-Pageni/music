const User = require("../models/user");
const Music = require("../models/music");

exports.getPlaylist = (req, res, next) => {
    console.log("userController > getPlaylist");
    console.log(req.query);
    let playlistIds = User.getPlaylist(req.query.session);

    let playlistObjects = [];
    for(let i=0; i<playlistIds.length; i++){
        playlistObjects.push(Music.findById(playlistIds[i]));
    }
    return res.status(200).json(playlistObjects);
};
exports.addToPlaylist = (req, res, next) => {
    console.log("userController > addToPlaylist");
    User.addToPlaylist(req.body.session, req.body.musicId);
    res.json({message: "done"});
};

exports.removeFromPlaylist = (req, res, next) => {
    console.log("userController > removeFromPlaylist");
    User.removeFromPlaylist(req.body.session, req.body.musicId)
    res.json({message: "done"});
};

exports.authenticate = (req, res, next) => {
    return res.status(200).json(User.authenticate(req.body.username,req.body.password));
};

exports.logout = (req, res, next) => {
    console.log(req.body.session);
    User.logout(req.body.session);
    res.json({message: "done"});
};