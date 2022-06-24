const express = require('express')
const router = express.Router()
const authMiddleware = require('./../middlewares/authMiddleware');

router.post("/authenticate", authMiddleware.authenticate);
router.get('/token', authMiddleware.token);

module.exports = router;
