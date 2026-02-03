// 게시물 작성, 수정, 삭제 기능

const Board = require('../models/Board');
const User = require('../models/User');

const { 
    validatedCategory,
    getBoardSortOption,
    handleCategoryCounters
} = require('../utils/boardUtils');

/** [POST] 게시물 작성
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createPost(req, res) {
    try {
         if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인이 필요한 서비스 입니다." });
        }
        const { category, title, content, performId, price } = req.body;
        const creatorId = req.user.id;

        if (!category || !title || !content) {
            return res.status(400).json({ message: "필수 항목(category, title, content)이 누락되었습니다." });
        }

        if (category === 'trade' && price === undefined) {
            return res.status(400).json({ message: "거래 게시글은 가격(price)이 필수입니다." });
        }

        const newBoard = new Board({
            category, // type -> category로 수정
            title,
            content, // description -> content 
            creator: creatorId,
            performId,
            price
        });

        // 카운터 업데이트
        await handleCategoryCounters(newBoard, true);
        await newBoard.save();
        res.status(201).json({ message: "게시물이 성공적으로 작성되었습니다.", board: newBoard });
    } catch (err) {
        res.status(500).json({ message: "서버 오류가 발생했습니다.", error: err.message });
    }
}

/** [PATCH] 게시물 수정
 * @param {Object} req - Express request object
 * @param {Object} req.params
 * @param {String} req.params.id - 게시물 ID
 * @param {Object} res - Express response object
 * 
 */
async function updatePost(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인 필요" });
        }
        const { id } = req.params;
        const { title, content, category, price, tradeStatus } = req.body;
        const userId = req.user.id;

        const board = await Board.findById(id);

        if (!board) {
            return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
        }

        if (board.creator.toString() !== userId) {
            return res.status(403).json({ message: "수정 권한이 없습니다." });
        }

        // 필드 업데이트
        if (title) board.title = title;
        if (content) board.content = content;
        if (category) board.category = category;
        if (price !== undefined) board.price = price;
        if (tradeStatus) board.tradeStatus = tradeStatus;

        await board.save();
        res.status(200).json({ message: "게시물이 수정되었습니다.", board });
    } catch (err) {
        res.status(500).json({ message: "서버 오류", error: err.message });
    }
}

/** [DELETE] 게시물 삭제
 * @param {Object} req - Express request object 
 * @param {Object} req.params 
 * @param {Object} req.params.id - 게시물 ID
 * @param {Object} res - Express response object
 */
async function deletePost(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인 필요" });
        }
        const { id } = req.params;
        const userId = req.user.id;

        const board = await Board.findById(id);

        if (!board) {
            return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
        }

        if (board.creator.toString() !== userId) {
            return res.status(403).json({ message: "삭제 권한이 없습니다." });
        }

        await board.deleteOne();
        res.status(200).json({ message: "게시물이 삭제되었습니다." });
    } catch (err) {
        res.status(500).json({ message: "서버 오류", error: err.message });
    }
}

// [GET] 게시물 목록 조회
async function getPosts(req, res){
    try {
        const {
            page = 1,
            limit = 10,
            category,
            sort,
            search,
        } = req.query;

        const query = {};

        const validCategory = validatedCategory(category);
        if (validCategory) {
            query.category = validCategory;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }



        //  DB 조회 / 페이징
        const skipCount = (Number(page) - 1) * Number(limit);
        const boards = await Board.find(query)
            .populate('creator', 'username') // 작성자 정보 포함
            .sort(getBoardSortOption(sort)) 
            .skip(skipCount)
            .limit(Number(limit));
        res.status(200).json({ boards });

        const totalCount = await Board.countDocuments(query);
        res.json({
            success: true,
            data: boards,
            pagination: {
                currentPage: Number(page),
                totalPage: Math.ceil(totalCount / Number(limit)),
                totalCount
            }
        });
    } catch (err) {
        res.status(500).json({ message: "게시글 목록 조회 실패", error: err.message });
    }
} 

// [GET] 특정 사용자 게시물 목록 조회
async function getUserPosts(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인 필요" });
        }   
        const userId = req.user.id;
        const boards = await Board.find({ creator: userId })
            .populate('creator', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json({ boards });
    } catch (err) {
        res.status(500).json({ message: "사용자 게시글 조회 실패", error: err.message });
    }
}

//[PATCH] 게시물 좋아요 토글 로직
async function toggleBoardLike(req, res) {
    try {
        if (!req.user?.id){ 
            return res.status(401).json({ message: "로그인 필요" });
        }

        const { id } = req.params; // 게시물 ID
        const userId = req.user.id;

        const board = await Board.findById(id);
        if (!board) return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });

        // 본인 게시글 좋아요 방지 
        if (board.creator.toString() === userId) {
            return res.status(400).json({ message: "본인의 게시물에는 좋아요를 누를 수 없습니다." });
        }

        const isLiked = board.whoLikes.includes(userId);
        
        //  좋아요 취소 로직
        if (isLiked) {
            // board 내부 좋아요 
            await Board.findByIdAndUpdate(id, {
                $pull: { whoLikes: userId },
                $inc: { countLikes: -1 }
            });
            // 작성자의 likesCount 차감
            await User.findByIdAndUpdate(board.creator, { $inc: { likesCount: -1 } });

            res.status(200).json({ 
                message: "좋아요 취소됨", 
                isLiked: false,
                likesCount : board.countLikes,
            });
        } 
        // 좋아요 추가 로직
        else {
            await Board.findByIdAndUpdate(id, {
                $addToSet: { whoLikes: userId },
                $inc: { countLikes: 1 }
            });
            // 작성자의 likesCount 증가
            await User.findByIdAndUpdate(board.creator, { $inc: { likesCount: 1 } });

            res.status(200).json({ 
                message: "좋아요 추가됨",
                isLiked: true,
                likesCount : board.countLikes, });
        }
    } catch (err) {
        res.status(500).json({ message: "게시글 좋아요 처리 중 오류 발생", error: err.message });
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getUserPosts,
    toggleBoardLike,
};