const models = require('../models');

function findAll(req, res) {
    models.Product.findAll().then((items) => {
        res.json({
            status: 'OK',
            data: items
        });
    });
}

function findOne(req, res) {
    const id = Number(req.params.id);
    models.Product.findByPk(id).then((items) => {
        res.json({
            status: 'OK',
            data: items
        });
    });
}

function findAllReviews(req, res) {
    const productId = Number(req.params.id);
    models.ProductReview.findAll({
        where: { ProductId: productId }
    }).then((items) => {
        res.json({
            status: 'OK',
            data: items
        });
    });
}

function createProduct(req, res) {
    const body = req.body;
    models.Product.create(body).then(([item, created]) => {
        res.json({
            status: 'OK',
            data: item
        });
    });
}

function createReview(req, res) {
    const review = req.body;
    models.ProductReview.create(review).then(([item, created]) => {
        res.json({
            status: 'OK',
            data: item
        });
    });
}

export default {
    findAll,
    findOne,
    findAllReviews,
    createProduct,
    createReview
}