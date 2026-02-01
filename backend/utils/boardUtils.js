const User = require('../models/User');
const Performance = require('../models/Performance');

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

module.exports = { handleCategoryCounters };