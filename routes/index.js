const express = require('express')
const router = express.Router();
const rootRouter = require('./rootRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const mustAuthenticated = require('./../middlewares/authMiddleware').checkToken;

router.use('/', rootRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/secret', mustAuthenticated, (req, res) => {
    res.send(req.decoded);
});

module.exports = router
