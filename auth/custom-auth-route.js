/**
 * Custom Authentication
 * Authentication route to receive user id/password and validate against db. 
 * On successful authentication it generates the jwt token and returns the user info along with token and expiration.
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models');
const PRIVATE_KEY = 'some-sensitive-key';///TODO to be taken from process.env
const TOKEN_EXPIRATION_SECOND = 600;///TODO move to config file

router.post('/', (req, res) => {
    let { username, password } = req.body;
    console.log('======', username)
    models.User.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        console.log(user)
        if (!user) {
            return res.status(404).json({
                "code": 404,
                "message": 'Not found',
                "data": "Kindly verify user id or password and try again!!!"
            });
        }
        let payload = { id: user.id };
        let token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: TOKEN_EXPIRATION_SECOND });
        res.json({
            "code": 200,
            "message": 'OK',
            "data": user,
            "token": token
        });
    });
})

export default router;