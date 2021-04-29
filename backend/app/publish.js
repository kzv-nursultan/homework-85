const express = require('express');
const auth = require("../middleware/auth");
const permit = require('../middleware/permit');
const ArtistSchema = require('../models/Artist');
const router = express.Router();

router.get('/', auth, permit('user', 'admin'), async (req, res)=>{
  res.send('henlo')
})

router.patch('/', auth, permit('user'), async (req, res)=>{
  console.log(req.body, req?.user);
  try {
    const track = await ArtistSchema.findByIdAndUpdate(req.body.artist, {published: req?.user._id});
    res.send(track);
  } catch (e) {
    res.status(400).send('wrong')
  }

});

module.exports = router