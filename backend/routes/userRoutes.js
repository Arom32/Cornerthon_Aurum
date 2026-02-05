const express = require("express")
const router = express.Router()
const {getProfile, updateProfile, registerUser, loginUser, logoutUser} = require("../controllers/user")
const {userLevel} = require("../controllers/userLeveling")
const getRanking = require("../controllers/userRanking")
const protect = require("../middleWares/authMiddleware")

// 회원가입  ( http://localhost:3000/api/user/register )
router.route("/register")  
.post(registerUser)

// 로그인 ( http://localhost:3000/api/user/login )
router.route("/login")
.post(loginUser)

// 로그아웃 ( http://localhost:3000/api/user/logout )
router.route("/logout")
.post(logoutUser)

// 프로필 조회 (칭호, 레벨, 포인트) ( http://localhost:3000/api/user/mypage )
router.route("/mypage")
.get(protect, getProfile)
// 닉네임 수정
.put(protect, updateProfile)

// 랭킹 조회  ( http://localhost:3000/api/user/ranking?type=weekly)
router.route("/ranking")  
.get(getRanking)

// 레벨링  ( http://localhost:3000/api/user/leveling)
router.route("/leveling")  
.post(protect, userLevel)



module.exports = router