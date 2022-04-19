const LocalStrategy = require("passport-local");
const passport = require("passport");
const fs = require("fs");
const path = require("path");

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    try {
        const users = JSON.parse(
            fs
                .readFileSync(path.join(__dirname, "..", "data", "users.json"))
                .toString()
        );
        let user;
        for (let i = 0; i < users.length; i++) {
            if (users[i]["username"] == username) {
                user = users[i];
                break;
            }
        }
        if(user){
            done(null, user);
        }
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new LocalStrategy((username, password, done) => {
        try {
            // get the user that matches the 'username' that we got on the request
        const users = JSON.parse(
            fs
                .readFileSync(path.join(__dirname, "..", "data", "users.json"))
                .toString()
        );
        let user;
        for (let i = 0; i < users.length; i++) {
            if (users[i]["username"] == username) {
                user = users[i];
                break;
            }
        }
        if (!user) {
            console.log("User not found");
            done(null, false);
        } else {
            console.log("User found");
            if (user["password"] === password) {
                console.log("Password Matched!");
                done(null, user);
            } else {
                console.log("Password did not match!");
                done(null, false);
            }
        }
        } catch (err) {
            done(err, false);
        }
    })
);
