const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref:'AlbumSchema',
        required: true
    },
    duration:{
        type:String,
        required:true
    }
});

const TrackSchema = mongoose.model('TrackSchema', NewSchema);
module.exports = TrackSchema;