const express = require('express');
const TrackSchema = require('../models/Track');
const ArtistSchema = require('../models/Artist');
const router = express.Router();

router.get('/', async (req,res)=>{
    if (req.query.album) {
        const queries = req.query.album;
        try {
            const data = await TrackSchema.find({album:queries}).populate('album');
            res.send(data);
        } catch (e) {
            res.status(404).send('Not found');
        }
    } else {
        try {
            const data = await TrackSchema.find();
            res.send(data);
        } catch (e) {
            res.status(500).send(e);
        };
    };
});

router.post('/', async (req, res)=>{
    const data = req.body;
    if (data.name && data.album && data.duration) {
        try {
            const newTrack = new TrackSchema(data);
            await newTrack.save();
            res.send(newTrack);
        } catch {
            res.status(500).send('Interval error');
        };
    } else {
        res.status(400).send('Bad Request');
    }
});

router.delete('/:id', async (req, res)=>{
    try {
        await TrackSchema.findByIdAndDelete(req.params.id);
        const data = await TrackSchema.find();
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    };
});

module.exports = router;