const models = require('../models');
const serverUtils = require('../utils').serverUtils;

function sendError(res, err) {
    res.status(400).json({
        status: 'FAIL',
        err: err
    });
}
function findAll(req, res) {
    models.User.find((err, items) => {
        if (err) {
            return sendError(res, err)
        }
        serverUtils.sendSuccessResponse(items);
        res.json({
            status: 'OK',
            data: items
        });
    });
}

function findRandomOne(req, res) {
    models.User.find((err, items) => {
        if (err) {
            return sendError(res, err)
        }
        let item = null;
        if (items.length) {
            let randomIndex = Math.floor(Math.random() * items.length);
            item = items[randomIndex];
        }
        res.json({
            status: 'OK',
            data: item
        });
    });
}

function findOne(req, res) {
    models.User.findById(req.params.id, (err, items) => {
        if (err) {
            return sendError(res, err)
        }
        res.json({
            status: 'OK',
            data: items
        });
    });
}

function create(req, res) {
    models.User.create(req.body, (err, item) => {
        if (err) {
            return sendError(res, err)
        }
        res.json({
            status: 'OK',
            data: item
        });
    })
}

function createOrUpdate(req, res) {
    if (!req.params.id) {
        return create(req, res);
    }
    models.User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, item) => {
        if (err) {
            return sendError(res, err)
        }
        res.json({
            status: 'OK',
            data: item
        });
    })
}

function deleteOne(req, res) {
    models.User.findByIdAndRemove(req.params.id, (err, item) => {
        if (err) {
            return sendError(res, err)
        }
        res.json({
            status: 'OK',
            data: item
        });
    })
}


export default {
    findAll,
    findRandomOne,
    findOne,
    deleteOne,
    create,
    createOrUpdate
}