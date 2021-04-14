const express = require('express');
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const ArtistScheme = require('../models/Artist');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, config.uploadPath);
   },
   filename:(req, file, cb) => {
       cb(null, nanoid(5) + path.extname(file.originalname));
   }
});


const upload = multer({storage});
const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        const data = await ArtistScheme.find();
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', upload.single('image'), async (req,res) => {
    const data = req.body;
    if (data.name && data.info) {
        if (req.file) {
            data.image = req.file.filename;
        };
        try {
           const newArtist = new ArtistScheme(data);
           await newArtist.save();
            res.send(newArtist);
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send('Bad request');
    }
});

module.exports = router;