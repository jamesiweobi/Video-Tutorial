const jwt = require('jsonwebtoken');

const signToken = async (id) => {
    return await jwt.sign({ user_id: id }, process.env.TOKEN_KEY, {
        expiresIn: process.env.EXPIRES_IN,
    });
};
