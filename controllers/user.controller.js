const models = require('../models');

function findAll(req, res) {
    models.User.findAll().then((items) => {
        res.json({
            status: 'OK',
            data: items
        });
    });
}

function findOne(req, res) {
    const id = Number(req.params.id);
    models.User.findByPk(id).then((items) => {
        res.json({
            status: 'OK',
            data: items
        });
    });
}

function createUser(req, res) {
    const body = req.body;
    models.User.create(body).then(([item, created]) => {
        res.json({
            status: 'OK',
            data: item
        });
    }).catch(err => {
        res.status(400).json(err.errors)
    });
}


export default {
    findAll,
    findOne,
    createUser
}