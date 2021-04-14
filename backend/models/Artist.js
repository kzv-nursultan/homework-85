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
    }
});

const ArtistSchema = mongoose.model('ArtistSchema', NewSchema );
module.exports = ArtistSchema;