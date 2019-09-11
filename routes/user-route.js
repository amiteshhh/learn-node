const express = require('express');
const router = express.Router();

import {userController} from '../controllers';

router.get('/:id', userController.findOne);
router.get('/', userController.findAll);
router.post('/', userController.createUser);

export default router;//needs babel
// module.exports = router;