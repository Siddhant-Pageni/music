const express = require('express');
const cors = require('cors');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const musicRoute = require('./routes/music');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', userRoute);
app.use('/music', musicRoute);


app.listen(3000, () => {console.log("Sercer is running on port 3000")})