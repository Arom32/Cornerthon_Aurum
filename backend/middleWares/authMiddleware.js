const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

// 로그인 이후 프로필 조회, 수정에 필요한 인증 미들웨어
const protect = asyncHandler(async (req, res, next) => {
    let token  
    
    // swagger 테스트를 위한 예외 처리
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } 
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token // 쿠키에서 토큰 꺼내기
    };

    if (!token) {
        res.status(401)
        throw new Error("로그인이 필요한 서비스입니다.")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // 토큰 해독

        // 해독된 ID로 유저 찾아서 req.user에 담기
        req.user = await User.findById(decoded.id).select("-password")
        
        next()
    } catch (error) {
        res.status(401);
        throw new Error("유효하지 않은 토큰입니다.");
    }
});

module.exports = protect