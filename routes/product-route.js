const express = require('express');
const router = express.Router();

import productController from '../controllers/product.controller'

router.route('/')
    .get(productController.findAll)
    .post(productController.createProduct);


router.get('/:id', productController.findOne)

router.route('/:id/review')
    .get(productController.findAllReviews)
    .post(productController.createReview)

export default router;
// module.exports = router;