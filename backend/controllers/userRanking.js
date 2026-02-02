const asyncHandler = require("express-async-handler")
const cron = require("node-cron") // 스케줄링 작업(예약) 도와주는 라이브러리
const User = require("../models/User")

// 주간/월간 최다 관람자 랭킹
const getRanking = asyncHandler(async (req, res) => {
    const { type } = req.query // 쿼리 스트링으로 타입을 받음 (예: get 요청 보낼 때 경로 /ranking?type=weekly)
    let sortField
    if (type === 'weekly') {
        sortField = 'weeklyReviewCount'
    } else if (type === 'monthly') {
        sortField = 'monthlyReviewCount'
    } else {
        sortField = 'totalReviewCount'
    }

    // 필드 기준으로 내림차순 정렬 후 상위 10명 추출
    const ranking = await User.find()
        .sort({ [sortField]: -1 }) 
        .limit(10)
        .select("username weeklyReviewCount monthlyReviewCount") // 몽구스 쿼리 헬퍼 함수

    res.json(ranking)
    console.log("랭킹 정상 출력")
})

// 주/월마다 랭킹 초기화
// (* * * * *)은 순서대로 분, 시간, 일, 월, 요일을 나타냄

// 매주 월요일 새벽 0시 0분에 주간 관람 횟수 리셋
cron.schedule('0 0 * * 1', async () => {
    try {
        await User.updateMany({}, { weeklyReviewCount: 0 }) // updateMany() 몽구스 함수 이용해서 그 전의 값을 일괄적으로 같은 값으로 update
        res.json('주간 랭킹 리셋 완료')
    } catch (err) {
        res.json('주간 리셋 중 에러 발생:', err)
    }
});

// 매월 1일 새벽 0시 0분에 월간 관람 횟수 리셋
cron.schedule('0 0 1 * *', async () => {
    try {
        await User.updateMany({}, { monthlyReviewCount: 0 })
        res.json('월간 랭킹 리셋 완료')
    } catch (err) {
        console.error('월간 리셋 중 에러 발생:', err)
    }
})

module.exports = getRanking