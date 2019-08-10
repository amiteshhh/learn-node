const express = require('express');
const router = express.Router();

import productController from '../controllers/product.controller'

router.route('/')
    .get(productController.findAll)
    .post(productController.insertOne);


router.get('/:id', productController.findOne)

router.get('/:id/review', productController.findAllReviews)

export default router;
// module.exports = router;