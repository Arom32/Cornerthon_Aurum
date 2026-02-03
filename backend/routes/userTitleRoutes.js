const express = require('express');
const router = express.Router();
const controller = require('../controllers/userTitle');
const protect = require("../middleWares/authMiddleware")


// [GET] 보유 칭호 및 현재 착용 칭호 조회
router.get('/owned', protect, controller.getUserOwnedTitles);

// [PATCH] 새로운 칭호 획득 (활동 보상 등)
router.patch('/acquire', protect, controller.getNewUserTitle);

// [PATCH] 현재 착용 칭호 변경
router.patch('/current',protect,  controller.updateCurrentUserTitle);

// [PATCH] 보유 칭호 제거 (이벤트 종료 등)
router.patch('/remove', protect,controller.deleteOwnedUserTitle);

module.exports = router;