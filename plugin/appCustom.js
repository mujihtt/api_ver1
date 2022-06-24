const express = require('express');
const router = express.Router();
const bodyParser = require('./bodyparser')
const helmet = require('./helmet');
const responseWith = require('./responseWith');

//helmet setup
router.use(helmet);

// body parser setup
router.use(bodyParser);

// Remove X-Powered-By Header
router.use((req, res, next) => {
    res.removeHeader("X-Powered-By");
    next();
})

module.exports = router;
