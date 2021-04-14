const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    artist:{
        type:Schema.Types.ObjectId,
        ref:'ArtistSchema',
        required:true
    },
    production_year:{
        type:Number,
        required:true
    },
    image:{
        type:String
    }
});

const AlbumSchema = mongoose.model('AlbumSchema', NewSchema);
module.exports = AlbumSchema;