const express = require('express');
const auth = require('../middleware/auth');
const trackHistory = require('../models/TrackHistory');
const Track = require('../models/Track');
const router = express.Router();

router.post('/', auth, async (req,res)=>{
    const track_id = req.body.track;
    if(!track_id){
        res.status(400).send('please input track');
    };
    const track = await Track.findById(track_id);

    try {
        const data = new trackHistory({
            user: req.user,
            track,
            artist: req.body.artist
        });
        data.currentTime();
        await data.save();
        res.send(data);
    } catch (error){
        res.status(500).send(error)
    }
});

router.get('/', auth, async (req,res)=>{
    try {
        const data = await trackHistory.find({user:req.user._id}).populate(['track', 'artist']).sort({datetime:-1});
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    };
});


router.delete('/:id', async (req,res)=>{
    try {
        await trackHistory.findByIdAndDelete(req.params.id);
        res.send('deleted');
    } catch {
        res.status(500).send('something went wrong');
    };
});

module.exports = router;