const e = require("express");

users = [
    {
        username: "siddhant",
        password: 1234,
        playlist: [],
        session: "",
    },
    {
        username: "test",
        password: "test",
        playlist: [],
        session: "",
    },
];
module.exports = class User {
    constructor(username, password, playlist = []) {
        this.username = username;
        this.password = password;
        this.playlist = playlist;
    }

    static authenticate(username, password) {
        const index = users.findIndex(
            (u) => u.username == username && u.password == password
        );
        if (index > -1) {
            // login successful
            const user = users[index];
            user.session = "musicAppSesssion-" + Math.ceil(Date.now());
            console.log(`list after session is updated! ->`);
            console.log(User.fetchAll());
            return { session: user.session };
        } else {
            throw new Error("Authentication Failed!!");
        }
    }

    static logout(session) {
        const index = users.findIndex((u) => u.session == session);
        if (index > -1) {
            const user = users[index];
            console.log(users);
            user.session = "";
            console.log(users);
        }
        return { status: 200 };
    }

    static findByUsername(username) {
        const index = users.findIndex((u) => u.username === username);
        if (index > -1) {
            return users[index];
        } else {
            throw new Error("User Not Found");
        }
    }

    static addToPlaylist(session, musicId) {
        const u = users.find((u) => u.session == session);
        console.log(`Music ID -> ${musicId}`);
        if (u.playlist.indexOf(musicId.toString()) == -1) {
            // The music is not on the playlist
            u.playlist.push(musicId.toString());
            console.log(`Music ${musicId} added to playlist`);
            return { status: 200 };
        } else {
            // This music is already on the playlist
            console.log("Music already on the playlist");
        }
    }

    static removeFromPlaylist(session, musicId) {
        console.log(musicId);
        const u = users.find((u) => u.session == session);
        let index = u.playlist.indexOf(musicId.toString());
        if (index == -1) {
            // The music is not on the playlist
            console.log("The music does not exist on the playlist");
        } else {
            // This music is already on the playlist
            u.playlist.splice(index, 1);
            console.log(`Removed ${musicId} from the playlist`);
            return { status: 200 };
        }
    }

    static getPlaylist(session) {
        const user = users.find((u) => u.session == session);
        if (user == null || user == undefined) {
            throw new Error("User not found");
        }
        return user.playlist;
    }

    static fetchAll() {
        return users;
    }
};
