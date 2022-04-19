const express = require('express');
const session = require('express-session');
const passport = require('passport');
const local = require('./strategies/local');

const authRoute = require('./routes/auth');


// const store = new session.MemoryStore();
const app = express();

app.use(session({
    secret: 'ourLittleSecret',
    cookie: {maxAge:3600000}, // 1 hour
    saveUninitialized: false,
    // store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/auth', authRoute);


app.listen(3000, () => {console.log("Sercer is running on port 3000")})