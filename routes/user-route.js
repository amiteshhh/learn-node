const express = require('express');
const router = express.Router();

import {userController} from '../controllers';

router.get('/random', userController.findRandomOne);
router.get('/:id', userController.findOne);
router.get('/', userController.findAll);
router.post('/', userController.create);
router.put('/:id', userController.createOrUpdate);
router.delete('/:id', userController.deleteOne);

export default router;//needs babel
// module.exports = router;