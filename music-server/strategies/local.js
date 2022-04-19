const LocalStrategy = require("passport-local");
const passport = require("passport");

const User = require("../models/user");

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    try {
        let user = User.findByUsername(username);
        done(null, user);
    } catch (err) {
        if(err.message != 'User Not Found') {
            done(err, null);
        }
    }
});

passport.use(
    new LocalStrategy((username, password, done) => {
        try {
            // get the user that matches the 'username' that we got on the request
            let user = User.findByUsername(username);
            if (user["password"] === password) {
                console.log("Password Matched!");
                done(null, user);
            } else {
                console.log("Password did not match!");
                done(null, false);
            }
        } catch (err) {
            if(err.message === 'User Not Found') {
                done(null, false);
            }
            else {
                done(err, false);
            }
        }
    })
);
