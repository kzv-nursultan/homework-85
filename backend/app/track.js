const express = require('express');
const TrackSchema = require('../models/Track');
const ArtistSchema = require('../models/Artist');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
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

router.post('/', auth, permit('user', 'admin'), async (req, res)=>{
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

router.delete('/:id', auth, permit('admin'), async (req, res)=>{
    try {
        await TrackSchema.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.patch('/:id', auth, permit('user', 'admin'), async (req, res)=>{
    try {
        await TrackSchema.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({message: 'Success'});
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;