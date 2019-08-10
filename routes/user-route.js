const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Amitesh kumar' }]);//can be connected to db or json file
})

export default router;//needs babel
// module.exports = router;