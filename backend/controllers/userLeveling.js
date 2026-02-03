const updateLevel = require("../utils/userUtils")
const asyncHandler = require("express-async-handler")

const userLevel = asyncHandler(async (req, res) => {
    const { amount } = req.body; // 프론트에서 보내준 점수
    const userId = req.user.id;  // 로그인 미들웨어에서 가져온 ID

    if (!amount) {
        return res.status(400).json({ message: "상승시킬 포인트가 필요합니다." })
    }
    const result = await updateLevel(userId, amount) // utils에서 불러오기

    res.status(200).json({
        success: true,
        data: result
    })
})

module.exports = {userLevel}