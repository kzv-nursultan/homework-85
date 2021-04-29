const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
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

module.exports = router;