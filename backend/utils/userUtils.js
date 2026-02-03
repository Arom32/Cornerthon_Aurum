const User = require("../models/User")

/**
 * @param {string} userId - 유저 ID
 * @param {number} amount - 이번에 획득한 포인트 (예: 20)
 */

const updateLevel = async (userId, amount) => {
    const user = await User.findById(userId)
    if (!user) throw new Error("유저를 찾을 수 없습니다.")

    const GOAL_PER_LEVEL = 100 // 레벨당 필요한 점수 기준
    user.point += amount // 누적 점수 기록
    let levelUp = false
    
    while (user.point >= user.level * GOAL_PER_LEVEL) {
        user.level += 1
        levelUp = true
    }

    await user.save()

    return {
        currentLevel: user.level,
        currentPoint: user.point,
        pointForUp: (user.level * GOAL_PER_LEVEL) - user.point,  // (다음 레벨까지 남은 포인트) - (현재 포인트) = 남은 포인트
        levelUp 
    }
}

module.exports = updateLevel