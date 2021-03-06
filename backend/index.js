const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const exitHook = require('async-exit-hook');
const config = require('./config');
const artist = require('./app/artist');
const albums = require('./app/albums');
const track = require('./app/track');
const users = require('./app/users');
const publish = require('./app/publish');
const trackHistory = require('./app/track_history');
const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('./public'));

app.use('/artists', artist);
app.use('/albums', albums);
app.use('/tracks', track);
app.use('/users', users);
app.use('/track_history', trackHistory);
app.use('/publish', publish);

const run = async () => {
    const connection = await mongoose.connect(config.db.url, config.db.options);

    app.listen(port, ()=>{
        console.log('server started on port ' + port);
    });

    exitHook(async callback => {
        await mongoose.disconnect();
        console.log(' mongoose was disconnected');
        callback();
    });
};

run().catch(e=>console.error(e));