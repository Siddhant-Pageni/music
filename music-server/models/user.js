const e = require("express");

users = [
    {
        username: "siddhant",
        password: 1234,
        playlist: []
    },
    {
        username: "test",
        password: "test",
        playlist: []
    }
]
module.exports = class User {
    constructor(username, password, playlist =[]) {
        this.username = username;
        this.password = password;
        this.playlist = playlist;
    }

    static findByUsername(username) {
        const index = users.findIndex(u=>u.username === username);
        if (index > -1){
            return users[index];
        }
        else {
            throw new Error('User Not Found');
        }
    }

    static addToPlaylist(username, musicId){
        try {
            let u = User.findByUsername(username);
            if(u.playlist.indexOf(musicId.toString()) == -1){ // The music is not on the playlist
                u.playlist.push(musicId.toString());
                console.log(`Music ${musicId} added to playlist`);
            } else { // This music is already on the playlist
                console.log("Music already on the playlist");
            }
        } catch (err) {
            console.log(err);
        }
    }

    static removeFromPlaylist(username, musicId) {
        try {
            let u = User.findByUsername(username);
            let index = u.playlist.indexOf(musicId.toString());
            if(index == -1){ // The music is not on the playlist
                console.log("The music does not exist on the playlist");
            } else { // This music is already on the playlist
                u.playlist.splice(index,1);
                console.log(`Removed ${musicId} from the playlist`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    getPlaylist() {
        return this.playlist;
    }

    static fetchAll() {
        return users;
    }
}