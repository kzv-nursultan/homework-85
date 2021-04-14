const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt");
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
        const user = new User(req.body);
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
         return res.status(200).send({token:user.token});
    } catch (error){
        res.status(500).send(error);
    };
});

router.delete('/:id', async (req, res)=>{
    try {
       await User.findByIdAndDelete(req.params.id);
       const users = await User.find();
       res.send(users);
    } catch (error){
        res.status(400).send(error)
    }
});

module.exports = router;