const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackHistory = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Users',
        required:true,
    },
    track:{
        type:Schema.Types.ObjectId,
        ref:'TrackSchema',
        required:true,
    },
    datetime:{
        type:String,
        required:true,
    },
});

TrackHistory.methods.currentTime = function() {
    this.datetime = new Date();
};

const HistoryOfTracks = mongoose.model('TrackHistory', TrackHistory);
module.exports = HistoryOfTracks;