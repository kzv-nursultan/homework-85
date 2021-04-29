const express = require('express');
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require('../config');
const AlbumSchema = require("../models/Album");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename:(req, file, cb) => {
        cb(null, nanoid(4) + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req,res)=>{
    if(req.query.artist) {
        const queries = req.query.artist
        try {
            const data = await AlbumSchema.find({artist:queries}).populate('artist', 'name').sort({production_year:1});
            res.send(data);
        } catch (e) {
            res.status(400).send(e);
        }
    } else {
        try {
            const data = await AlbumSchema.find();
            res.send(data);
        } catch (e) {
            res.send(500).send(e);
        }
    }
});

router.get('/:id', async (req,res)=>{
    try {
        const data = await AlbumSchema.findById(req.params.id).populate('artist');
        res.send(data);
    } catch (e) {
        res.status(404).send('Not Found');
    }
});

router.post('/', auth, permit('user', 'admin'), upload.single('image'), async (req,res)=>{
    const data = req.body;
    if (data.name && data.artist && data.production_year) {
        if (req.file) {
            data.image = '/uploads/' + req.file.filename;
        }
        const newAlbum = new AlbumSchema(data);
        try {
            await newAlbum.save();
            res.send(newAlbum);
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send('Bad Request');
    }
});

router.patch('/:id', auth, permit('admin'), async (req, res)=>{
    try {
        await AlbumSchema.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({message:'Published!'});
    } catch (e) {
        res.send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res)=>{
    try {
        await AlbumSchema.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;