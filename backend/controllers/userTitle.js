const User = require("../models/User")
const { TITLE_LIST, convertMaskToTitleArray } = require("../utils/userTitleUtils");


// [GET] 유저 보유 칭호 조회
async function getOwnedUserTitles(req, res){
    try{
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인 필요" });
        }   

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
        }

        res.status(200).json({ 
            userId: user._id,
            name: user.username,
            currentTitle: user.currentTitle,
            ownedTitles: user.ownedTitles,
            ownedTitleNames: convertMaskToTitleArray(user.ownedTitles)
        });
    }
    catch(err){
        res.status(500).json({ message: "유저 칭호 조회 중 오류 발생", error: err.message });
    }
}

// [PATCH] 유저 보유 칭호 업데이트 - 새 칭호(단일) 획득
async function getNewUserTitle(req, res){
    try{
        if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "로그인 필요" });
        }

        const{ WishGetTitleBit } = req.body; // 변경하려는 칭호 비트 값
        const user = await User.findById(req.user.id); 

        if (!user) {
            return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
        }
        
        if ( !TITLE_LIST[WishGetTitleBit]) {
            return res.status(400).json({ message: "유효하지 않은 칭호 비트 값입니다." });
        }
            
        if ((user.ownedTitles & WishGetTitleBit) !== 0) {
            return res.status(200).json({ 
            message: "이미 보유 중인 칭호입니다.",
            ownedTitles: user.ownedTitles,
            ownedTitleNames: convertMaskToTitleArray(user.ownedTitles)
            });
        }

        user.ownedTitles = (WishGetTitleBit | user.ownedTitles) >>> 0; // 비트 OR 연산으로 칭호 추가

        // 수정한 내용 갱신
        await user.save()
        res.json({ 
            message: `칭호 ${TITLE_LIST[WishGetTitleBit]}_val: ${WishGetTitleBit} 획득에 성공하였습니다.`,
            name: user.username,
            currentTitle: user.currentTitle,
            ownedTitles: user.ownedTitles,
            ownedTitleNames: convertMaskToTitleArray(user.ownedTitles),
            newTitle: TITLE_LIST[WishGetTitleBit],
            newTitleBit: WishGetTitleBit
            });
        
        }
    catch(err){
        res.status(500).json({ message: "유저 칭호 업데이트 중 오류 발생", error: err.message });
    }
}

// [PATCH] 유저 보유 칭호 업데이트 - 보유 칭호 제거 
async function deleteOwnedUserTitle(req, res){
    try{
        if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "로그인 필요" });
        }

        const{ WishDeleteTitleBit } = req.body; // 변경하려는 칭호 비트 값
        const user = await User.findById(req.user.id); 

        if (!user) {
            return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
        }
        
        if (!TITLE_LIST[WishDeleteTitleBit]) {
            return res.status(400).json({ message: "유효하지 않은 칭호 비트 값입니다." });
        }

        if ((WishDeleteTitleBit & 3) !== 0) { // 기본 칭호(새싹 관람객, 나무 관람객) 제거 시도
            return res.status(400).json({ message: "기본 칭호는 제거할 수 없습니다." });
        }
        user.ownedTitles = (~WishDeleteTitleBit & user.ownedTitles) >>> 0; // 비트 AND 연산으로 칭호 제거
        // 이때 wishDeleteTitleBit(지우고자 목표하는 칭호의 비트 값)는 NOT 연산자로 반전 처리 필요
        if (user.currentTitle === TITLE_LIST[WishDeleteTitleBit]) { // 현재 칭호가 제거된 칭호일 경우 현재 칭호 x
                user.currentTitle = TITLE_LIST[0];
            }

        // 수정한 내용 갱신
        await user.save()
        res.json({ 
            message: `칭호 ${TITLE_LIST[WishDeleteTitleBit]}_val: ${WishDeleteTitleBit} 제거에 성공하였습니다.`,
            name: user.username,
            currentTitle: user.currentTitle,
            ownedTitles: user.ownedTitles,
            ownedTitleNames: convertMaskToTitleArray(user.ownedTitles),
            deletedTitleBit: WishDeleteTitleBit,
            deletedTitle : TITLE_LIST[WishDeleteTitleBit],
            });
        
        }
    catch(err){
        res.status(500).json({ message: "유저 칭호 업데이트 중 오류 발생", error: err.message });
    }
}

// [PATCH] 유저 현재 칭호 변경
async function updateCurrentUserTitle(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인 필요" });
        }

        const { titleId } = req.body; // 변경하고자 하는 칭호의 비트 값
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
        }

        //  0이 아니고 TITLE_LIST에 없는 경우
        if (titleId !== 0 && !TITLE_LIST[titleId]) {
            return res.status(400).json({ message: "유효하지 않은 칭호 비트 값입니다." });
        }

        //  0이 아닐 때만 비트 체크 수행
        if (titleId !== 0 && (user.ownedTitles & titleId) === 0) {
            return res.status(403).json({ message: "해당 칭호를 보유하고 있지 않습니다." });
        }

        // 값 할당 
        user.currentTitle = TITLE_LIST[titleId];
        // 수정한 내용 갱신
        await user.save();

        res.json({ 
            message: `현재 칭호가 ${TITLE_LIST[titleId]}로 변경되었습니다.`, 
            name : user.username,
            currentTitle: user.currentTitle })
        
    } catch (err) {
        res.status(500).json({ message: "유저 현재 칭호 업데이트 중 오류 발생", error: err.message });
    }
}


module.exports = { 
    getUserOwnedTitles: getOwnedUserTitles, 
    getNewUserTitle,
    updateCurrentUserTitle,
    deleteOwnedUserTitle,
};