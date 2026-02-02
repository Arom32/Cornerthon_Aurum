const express = require('express');
const router = express.Router();
const controller = require('../controllers/board');
const protect = require("../middleWares/authMiddleware")

router.post('/', protect, controller.createPost);


router.patch('/:id', protect, controller.updatePost);

router.delete('/:id', protect, controller.deletePost);

module.exports = router;
