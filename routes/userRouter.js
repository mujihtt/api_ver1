const express = require('express')
const router = express.Router();
const userMiddleware = require('./../middlewares/userMiddleware')

router.get("/", userMiddleware.getUsers);
router.get('/:id', userMiddleware.getUniqueUser);
router.post('/', userMiddleware.addUser);
router.put('/:id', userMiddleware.updateUser);

module.exports = router;
