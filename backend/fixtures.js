const mongoose = require('mongoose');
const config = require('./config');
const Artist = require("./models/Artist");
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require("./models/User");
const TrackHistory = require('./models/TrackHistory');
const {nanoid} = require("nanoid");


const run = async () => {
    await mongoose.connect(config.db.url, config.db.options);

    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [RollingStones, Elvis, Sting] = await Artist.create({
        name:"Rolling Stones",
        info:"The Rolling Stones are an English rock band formed in London in 1962",
        image:"/fixtures/rollings.jpg"
    }, {
        name: "Elvis Presley",
        info: "He is regarded as one of the most significant cultural icons of the 20th century",
        image: "/fixtures/elvis.jpg"
    },{
        name:"Sting",
        info:"English musician and actor",
        image:"/fixtures/sting.jpg"
    });

    const [TheRollingStones, ElvisChristmasAlbum, Symphonicities] = await Album.create({
        name: 'The Rolling Stones',
        artist: RollingStones,
        production_year: '1964',
        image: '/fixtures/rollingAlbum.jpg'
    }, {
        name:'Elvis Christmas Album',
        artist:Elvis,
        production_year: '1957',
        image:'/fixtures/elvis.jpg'
    }, {
        name: 'Symphonicities',
        artist: Sting,
        production_year: '2010',
        image:'/fixtures/sting.jpg'
    });

    const [Route66, BlueChristmas, Englishman] = await Track.create({
        name:'Route 66',
        album: TheRollingStones,
        duration:'2:20'
    }, {
        name: 'Blue Christmas',
        album: ElvisChristmasAlbum,
        duration:'2:22'
    }, {
        name: 'Englishman in New York',
        album: Symphonicities,
        duration:'4:23',
        video:'https://www.youtube.com/embed/d27gTrPPAyk'
    });

    const [user1, user2] = await User.create({
        username: 'user1',
        password: 'user1',
        token: nanoid(),
    }, {
        username: 'user2',
        password: 'user2',
        token: nanoid(),
    });

    await TrackHistory.create({
        user: user1,
        track: Route66,
        datetime: new Date(),
        artist: TheRollingStones,
    }, {
        user: user2,
        track: BlueChristmas,
        datetime: new Date(),
        artist: Elvis,
    }, {
        user: user2,
        track: Englishman,
        datetime: new Date(),
        artist: Sting
    });

    await mongoose.connection.close();
};

run().catch(e=>console.error(e));