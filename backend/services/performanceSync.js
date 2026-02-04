const cron = require("node-cron") ;
const kopis = require('./kopis');
const Performance = require('../models/Performance');



const task = cron.schedule('0 1 * * *', async () => {
    console.log('[Cron] 공연 데이터 업데이트 시작');
    await updatePrfList();
}, {
    scheduled: true,
    timezone: "Asia/Seoul"
});

async function updatePrfList() {
    try {
        const resCount = await kopis.fetchAndSavePerformances();
        if(resCount>=200){
            await kopis.fetchAndSavePerformances();
            // 최대 400번
        }
        // 목록 업데이트 완료 후 상세 정보 업데이트 (필요 시)
        const count = await kopis.updateDetailInfo(); 
   
        console.log(' 모든 수집 프로세스 완료');
        await countTotalPerformances();
    } catch (error) {
        console.error('[Cron] 작업 중 에러 발생:', error.message);
    }
}

async function countTotalPerformances(){
    try {
        const total = await Performance.countDocuments({});
        const active = await Performance.countDocuments({ status: 'ACTIVE' });
        const noDetail = await Performance.countDocuments({ mt10id: { $exists: false } });
    
        return {
          total_performances: total,    // 전체 저장된 수
          active_performances: active,  // 현재 상영/예정 중인 수
          need_detail_update: noDetail  // 상세 정보 업데이트 필요한 수
        };

    } catch (err) {
        console.error('DB 조회 실패');
    }
}

// (async () => {
//     console.log('[System] 서버 시작 시 초기 데이터 수집 실행');
//     await updatePrfList();
// })();