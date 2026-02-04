const express = require("express")
const router = express.Router()
const {createComment, updateComment, deleteComment} = require("../controllers/comments")
const protect = require("../middleWares/authMiddleware")

// 기본 url:  ( http://localhost:3000/api/comments )

router.route("/")  
.post(protect, createComment)

router.route('/:id')
.put(protect, updateComment)

router.route('/:id')
.delete(protect, deleteComment)

module.exports = router

