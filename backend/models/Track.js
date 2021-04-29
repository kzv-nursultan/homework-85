const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
    },
    video:{
        type:String,
    },
    published: {
        type: String,
        required: true,
        default: false,
    },
});

NewSchema.plugin(AutoIncrement,{inc_field:'number'});
const TrackSchema = mongoose.model('TrackSchema', NewSchema);
module.exports = TrackSchema;