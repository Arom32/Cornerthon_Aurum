const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/User") // 유저 db 가져오기
require("dotenv").config({ quiet: true })
jwtSecret = process.env.JWT_SECRET // .env 안의 비밀키 가져오기
jwt = require("jsonwebtoken")

// 프로필 조회
const getProfile = asyncHandler(async (req, res) => {
    // 미들웨어에서 넣어준 유저 ID로 DB 찾기
    const user = await User.findById(req.user.id).select("-password") // 비밀번호는 빼고 가져오기

    if (!user) {
        res.status(404)
        throw new Error("유저를 찾을 수 없습니다.")
    }

    // 결과 전송 
    res.json({name: user.username, point: user.point, level: user.level, title: user.currentTitle})
})

// 프로필 수정
const updateProfile = asyncHandler(async (req, res) => {
    const {username} = req.body
    const user = await User.findById(req.user.id).select("-password") 
    if (!user) {
        res.status(404)
        throw new Error("유저를 찾을 수 없습니다.")
    } 
    // 수정한 내용 갱신
    user.username = username
    await user.save()
     res.json({ message: "프로필 수정에 성공하였습니다.", name: user.username, point: user.point, level: user.level, title: user.title })
    
})

// 회원가입 (db에 새로운 사용자 추가)
const registerUser = asyncHandler(async (req, res) => {
    const {username, password1, password2} = req.body
    if (password1 === password2) {
        const hashedPassword = await bcrypt.hash(password1, 10)
        newuser = await User.create({username, password: hashedPassword})
        res.json({ message: "회원 가입에 성공하였습니다.", newuser })
    }
    else {
        res.status(404)
        throw new Error("다시 시도해주세요.")
    }
})

// 로그인 (사용자 인증)
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({ username })
    if (!user) {
        return res.json({ message: "유저를 찾을 수 없습니다." }) 
    }
    const ismatch = await bcrypt.compare(password, user.password) 
        if (!ismatch) {
            return res.json({ message: "비밀번호가 일치하지 않습니다." })
        }

        // 일치하면 이제 토큰 발급
        const token = jwt.sign( { id: user._id }, jwtSecret) 
        res.cookie("token", token, {httpOnly: true} ) // 응답할 때 쿠키에 토큰 담아서 전송.
        res.json({ message: "로그인에 성공하였습니다.", token }) // 확인용 한 줄.
    
   
}

)
// 로그아웃, 쿠키 삭제
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) })
    res.json({ message: "로그아웃 되었습니다." })
})

module.exports = {getProfile, updateProfile, registerUser, loginUser, logoutUser}