const express = require('express');
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const ArtistScheme = require('../models/Artist');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

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

router.post('/', auth, permit('user', 'admin'), upload.single('image'), async (req,res) => {
    const data = req.body;
    if (data.name && data.info) {
        if (req.file) {
            data.image = '/uploads/' + req.file.filename;
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

router.patch('/:id', auth, permit('admin'), async (req, res)=>{
  try {
    await ArtistScheme.findByIdAndUpdate(req.params.id, req.body);
    res.send({message: 'Published!'});
  } catch (e) {
    res.status(400).send('wrong')
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res)=>{
  try {
    await ArtistScheme.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
})

module.exports = router;