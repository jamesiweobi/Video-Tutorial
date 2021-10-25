const jwt = require('jsonwebtoken');

const signToken = async (id) => {
    return await jwt.sign({ user_id: id }, process.env.TOKEN_KEY, {
        expiresIn: process.env.EXPIRES_IN,
    });
};

const authToken = (req, res, next) => {
    const token = req.cookies.Token;
    if (!req.cookies.Token) {
        return res.render('guest', {
            layout: 'layout',
        });
        // return res.status(401).send({
        //     status: 'Unauthorized',
        //     redirect: '/courses/login',
        //     message: 'Please login to proceed',
        // });
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.render('guest', {
                layout: 'guest',
            });
            // return res.status(401).send({
            //     status: 'Unauthorized',
            //     redirect: '/courses/login',
            //     message: 'Exipred Token, please login to proceed',
            // });
        }
    });
    next();
};

module.exports = {
    signToken,
    authToken,
};
