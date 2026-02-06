const express = require('express');
const router = express.Router();
const controller = require('../controllers/board');
const protect = require("../middleWares/authMiddleware")

router.get('/list', controller.getPosts);
router.get('/user', protect, controller.getUserPosts);
router.patch('/like', protect, controller.toggleBoardLike); // <--- 프론트 요청과 일치

router.post('/', protect, controller.createPost);
router.get('/:id/comments', controller.getBoardComments);
router.patch('/:id', protect, controller.updatePost);
router.delete('/:id', protect, controller.deletePost);

module.exports = router;
