const express = require('express')
const router = express.Router();
const rootMiddleware = require('./../middlewares/rootMiddleware');

router.get('/', rootMiddleware.getIndex);

module.exports = router;
