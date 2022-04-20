const Music = require("../models/music");

exports.getAllMusic = (req, res, next) => {
    console.log("musicController > getAllMusic");
    const search = req.query;
    let allMusic = Music.fetchAll();

    if(search && search.title) {
        console.log("Search Called!");
        allMusic = allMusic.filter(m => m.title.toLowerCase().search(search.title.toLowerCase()) > -1);
    }
    res.json(allMusic);
}