const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    info:{
        type: String,
        required:true
    },
    image:{
        type:String,
    },
    published: {
        type: String,
        required: true,
        default: false,
    },
});

const ArtistSchema = mongoose.model('ArtistSchema', NewSchema );
module.exports = ArtistSchema;