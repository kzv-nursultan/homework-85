const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const config = require("../config");
const axios = require("axios");
const {nanoid} = require("nanoid");
const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        const users = await User.find();
        res.send(users);
    } catch (error){
        res.status(500).send(error);
    };
});

router.post('/', async (req,res)=>{
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatarImage: req.body.avatarImage,
        });

        await user.save();
        res.send(user);
    } catch (error){
        res.status(400).send(error);
    }
});

router.post('/session', async (req,res) => {
    const user = await User.findOne({username:req.body.username});
    if(!user) {
        return res.status(400).send({error:'User not found'});
    };

    const isMatch = await user.checkPassword(req.body.password);
    if(!isMatch) {
        return res.status(400).send({error:'User not found'});
    };

    try {
         user.generateToken();
         await user.save();
         return res.status(200).send({
             message:'username and password are correct',
             user
         });
    } catch (error){
        res.status(500).send(error);
    };
});

router.delete('/session', auth, async (req, res)=>{
    const token = req.get('Authorization');
    const success = {message: 'Success!'};

    if(!token) return res.send(success);

    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generateToken();
    await user.save();
    res.send(success);
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }

        if (req.body.id !== response.data.data?.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            user = new User({
                username: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatarImage: req.body.picture.data.url,
            });
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Login or register successful', user});
    } catch (e) {
        res.status(401).send(e);
    }
})

module.exports = router;