const Music = require("../models/music");

exports.getAllMusic = (req, res, next) => {
    console.log("musicController > getAllMusic");
    console.log(req.user);
    if (req.user) {
        const search = req.query;
        let allMusic = Music.fetchAll();

        if(search && search.title) {
            console.log("Search Called!");
            allMusic = allMusic.filter(m => m.title.toLowerCase().search(search.title.toLowerCase()) > -1);
        }
        res.json(allMusic);
    } else {
        res.status(403).send({ msg: "Not Authenticated" });
    }
}