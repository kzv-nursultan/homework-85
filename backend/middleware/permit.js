const permit = (...role) => {
    return (req, res, next) => {
        if (!req.user) {
           return res.status(401).send({message: 'Unauthenticated'});
        }

        if (!role.includes(req.user.role)) {
            return res.status(403).send({message: 'Unauthorized'});
        }

        next();
    }
};

module.exports = permit;