/**
 * Authentication route to validate user id and password. It uses jwt token and Bearer authentication mechanism
 * On successful authentication it returns the jwt.
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'some-sensitive-key';///TODO to be taken from process.env
const TOKEN_EXPIRATION_SECOND = 60;

const userDb = [{ id: 1, name: 'Node developer', email: 'xyz@mail.com' }];
const authDb = [{ id: 1, password: 1 }];

router.post('/', (req, res) => {
    let loginInfo = req.body;
    let userInfo = getUserInfo(loginInfo)
    if (!userInfo) {
        return res.status(404).json({
            "code": 404,
            "message": 'Not found',
            "data": "Kindly verify user id or password and try again!!!"
        });
    }
    let payload = { id: userInfo.id };
    let token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: TOKEN_EXPIRATION_SECOND });
    res.json({
        "code": 200,
        "message": 'OK',
        "data": { "user": userInfo },
        "token": token
    });
})

function getUserInfo(loginInfo) {
    let isUserValid = authDb.some(user => user.id === loginInfo.id && user.password === loginInfo.password);
    return isUserValid && userDb.find(user => user.id === loginInfo.id);
}

export default router;