const User = require('../models/User');
const Performance = require('../models/Performance');

const ALLOWED_CATEGORIES = ["review", "question", "notice", "general", "trade"];

async function handleCategoryCounters(boardData, increment) {
    const { category, creator, PerformId } = boardData;
    const value = increment ? 1 : -1;

    // 공통: 유저 게시글 수 조정
    await User.findByIdAndUpdate(creator, { $inc: { postCount: value } });

    // 분기: 후기 게시판일 경우에만 공연 모델 카운트 조정
    if (category === 'review' && PerformId) {
        await Performance.findByIdAndUpdate(PerformId, { $inc: { postCount: value } });
    }

    if (category === 'trade') {
        
    }
}

function validatedCategory(category) {
    return ALLOWED_CATEGORIES.includes(category)? category : undefined;
}

function getBoardSortOption(sort) {
    switch (sort) {
        case 'newest':
            return { createdAt: -1, _id: 1 };
        case 'oldest':
            return { createdAt: 1, _id: 1 };
        case 'popular':
            return { countLikes: -1, _id: 1 };
        default:
            return { createdAt: -1, _id: 1 }; // 기본 정렬 기준
    }
}

module.exports = { handleCategoryCounters, validatedCategory, getBoardSortOption };