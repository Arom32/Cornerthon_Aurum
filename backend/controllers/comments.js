const asyncHandler = require("express-async-handler")
const Comment = require("../models/Comment") 

// 댓글 작성
const createComment = asyncHandler(async (req, res) => {
    try {
        if (!req.user || !req.user.id)  {
        return res.status(401).json({ message: "로그인이 필요한 서비스 입니다." })
    }
        const { content, parentCommentId, boardId  } = req.body // 일반 댓글 달고 싶으면 패런트 비우고 요청하면 될 듯
        const creatorId = req.user.id
   
        if ((!boardId || !content) ) {
            return res.status(401).json({ message: "필수 항목이 누락되었습니다." })
    }
        if (parentCommentId) { // parentCommentId가 존재할 경우 -> 답글(대댓글) / 존재하지 않을 경우 -> 댓글
            const parentComment = await Comment.findById(parentCommentId) // 프론트에서 보내 준 게 진짜 있는지 확인. 똑같은 이름으로 선언했더니 에러 남
            if (!parentComment) {
                return res.status(404).json({ message: "답글을 달 부모 댓글을 찾을 수 없습니다." }) 
            }
        }
        const newComment = new Comment({
        content,
        creator: creatorId,
        boardId,
        parentCommentId: parentCommentId || null // parentCommentId가 있으면 그 값을 넣고, 없으면 null로 저장
    })
        await newComment.save()
        res.status(201).json({ message: "댓글이 성공적으로 작성되었습니다.", newComment })
}

   catch(err) {
    res.status(500).json({ 
        message: "서버 오류가 발생했습니다.",
        error: err.message
  }) }
  
})
// 댓글 수정
const updateComment = asyncHandler(async(req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인이 필요한 서비스 입니다." })
        }
        const { id } = req.params // 대상이 되는 특정 댓글 /user/123.. 아까 newComment 에서 생긴 고유아이디인가 내가 이걸 url에 넣어주면?
        const { content } = req.body // 바꿀 내용 미리 넣어줌. 패런트, 보드아이디는 불변
        const userId = req.user.id

        const comment = await Comment.findById(id) // 뭉치 들고 와서 줌 안에 부모아이디 보드아이디 등등 다 있음

        if (!comment) {
            return res.status(404).json({ message: "댓글을 찾을 수 없습니다." })
        }

        if (comment.creator.toString() !== userId) { // 댓글 단 사람과 방금 로그인 한 사람이 다르다면
            return res.status(403).json({ message: "댓글의 수정 권한이 없습니다." })
        }

        // 필드 업데이트
        if (content) comment.content = content

        await comment.save();
        res.status(200).json({ message: "댓글이 수정되었습니다.", comment })
    } catch (err) {
        res.status(500).json({ message: "서버 오류", error: err.message })
    }
})
// 객체 뭉치를 넣어줬으니 지우면 패런트아이디 이런것도 알아서 지워지겠네 
//  // const content = req.body; 
        // // 어차피 지우니까 뭘 받아올 필요가 없나
// 댓글 삭제
const deleteComment = asyncHandler(async(req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인이 필요한 서비스 입니다." })
        }
        const { id } = req.params // 대상이 되는 특정 댓글 /user/123.. 아까 newComment 에서 생긴 고유아이디인가
        const userId = req.user.id

        const comment = await Comment.findById(id); // 뭉치 들고 와서 줌 안에 부모아이디 보드아이디 등등 다 있음

        if (!comment) {
            return res.status(404).json({ message: "댓글을 찾을 수 없습니다." })
        }

        if (comment.creator.toString() !== userId) {// 댓글 단 사람과 방금 로그인 한 사람이 다르다면
            return res.status(403).json({ message: "댓글의 삭제 권한이 없습니다." })
        }

        await comment.deleteOne();
        res.status(200).json({ message: "댓글이 삭제되었습니다." })
    } catch (err) {
        res.status(500).json({ message: "서버 오류", error: err.message })
    }
})

module.exports = { createComment, updateComment, deleteComment }