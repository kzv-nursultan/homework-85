const User = require('../models/User');

const auth = async (req,res,next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send('Token not exist');
    };

    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send('User not found');
    };

    req.user = user;
    next();
};

module.exports = auth;

// const token = req.get('Authorization');
// if(!token) {
//     res.status(401).send({error:'token not found'});
// };
//
// const user = await Users.findOne({token});
// if(!user) {
//     res.status(401).send({error:'Token is incorrect'});
// };