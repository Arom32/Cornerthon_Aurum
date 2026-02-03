// 유저 칭호(리뷰왕 등)

const TITLE_LIST = {
    0: "", // 칭호 없음
    1: "새싹 관람객",      // 2^0 - 기본 칭호 level 1
    2: "나무 관람객",   // 2^1 - level 10 이상 획득
    4: "커뮤니티 마스터",    // 2^2 - 게시글 쓰기 활동
    8: "척척박사",    // 2^3 - 질문 답변 활동
    16: "리뷰왕"   // 2^4 - 후기글 작성 활동
};

// 기본값 00001 -> 새싹 관람객
// level 10 이상 시 00011 -> 나무 관람객 추가

/**
 * 비트마스크 값을 명칭 배열로 변환
 * @param {Number} mask - DB에 저장된 ownedTitles 비트 값
 * @returns {String[]} 보유 칭호 명칭 배열
 */
const convertMaskToTitleArray = (mask) => {
    return Object.keys(TITLE_LIST)
        .map(Number) // 키를 숫자로 변환
        .filter(bit => bit !== 0 && (mask & bit) !== 0) // 0 제외 및 비트 연산 확인
        .map(bit => TITLE_LIST[bit]); // 명칭으로 치환
};

module.exports = { 
    TITLE_LIST,
    convertMaskToTitleArray 
};