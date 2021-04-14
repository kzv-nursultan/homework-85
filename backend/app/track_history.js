const express = require('express');
const trackHistory = require('../models/TrackHistory');
const Users = require('../models/User');
const Track = require('../models/Track');
const router = express.Router();

router.post('/',async (req,res)=>{
    const track_id = req.body.track;
    if(!track_id){
        res.status(400).send('please input track');
    };
    const track = await Track.findById(track_id);

    const token = req.get('Authorization');
    if(!token) {
        res.status(401).send({error:'token not found'});
    };

    const user = await Users.findOne({token});
    if(!user) {
        res.status(401).send({error:'Token is incorrect'});
    };

    try {
        const data = new trackHistory({
            user,
            track,
        });
        data.currentTime();
        await data.save();
        res.send(data);
    } catch (error){
        res.status(500).send(error)
    }
});

router.get('/', async (req,res)=>{
    try {
        const data = await trackHistory.find().populate(['user', 'track']);
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