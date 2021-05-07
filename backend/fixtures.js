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
        image:"/fixtures/rollings.jpg",
        published: true,
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
        image: '/fixtures/rollingAlbum.jpg',
        published: true
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
        duration:'2:20',
        published: true
    }, {
        name: 'Blue Christmas',
        album: ElvisChristmasAlbum,
        duration:'2:22'
    }, {
        name: 'Englishman in New York',
        album: Symphonicities,
        duration:'4:23',
        video:'https://www.youtube.com/embed/d27gTrPPAyk'
    }, {
        name: "Mona",
        album: TheRollingStones,
        duration: '2:30'
    },{
        name: "I Just Want to Make Love to You",
        album: TheRollingStones,
        duration: '2:30'
    }, {
        name: "Honest I Do",
        album: TheRollingStones,
        duration: '2:30',
    }, {
        name:	"Little by Little",
        album: TheRollingStones,
        duration: '2:30',
        published: true
    }, {
        name: "Carol",
        album: TheRollingStones,
        duration: '2:30',
    }, {
        name:	"White Christmas",
        album: ElvisChristmasAlbum,
        duration: '2:30'
    }, {
        name:	"Here Comes Santa Claus",
        album: ElvisChristmasAlbum,
        duration: '2:30'
    }, {
        name:	"Blue Christmas",
        album: ElvisChristmasAlbum,
        duration: '2:30'
    }, {
        name: "Silent Night",
        album: ElvisChristmasAlbum,
        duration: '2:30',
    }, {
        name:	"I Believe",
        album: ElvisChristmasAlbum,
        duration: "2:30"
    }, {
        name: "Next to You",
        album: Symphonicities,
        duration: "2:30",
    }, {
        name: "Englishman in New York",
        album: Symphonicities,
        duration: '4:23'
    }, {
        name: "I Hung My Head",
        album: Symphonicities,
        duration: '3:00',
    }, {
        name: "You Will Be My Ain True Love",
        album: Symphonicities,
        duration: '3:00'
    }, {
        name: "Roxanne",
        album: Symphonicities,
        duration: '2:30'
    });

    const [user1, user2] = await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
        displayName: 'admin'
    }, {
        username: 'user',
        password: 'user',
        token: nanoid(),
        role: 'user',
        displayName: 'user'
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