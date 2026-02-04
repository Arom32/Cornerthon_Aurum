import React from 'react';
// 1. BrowserRouter, Routes, Route를 각각 정확한 역할에 맞게 임포트합니다.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 컴포넌트 임포트 (경로 확인 필수)
import Mainpage from './main-page/main-page.jsx';
import Mainoption from './main-option/main-option.jsx';
import Mainperformance from './main-performance/main-performance.jsx';
import Performanceconcert from './performance-concert/performance-concert.jsx';
import Performancemusical from './performance-musical/performance-musical.jsx';
import Performanceplayacting from './performance-playacting/performance-playacting.jsx';
import Performancefestival from './performance-festival/performance-festival.jsx';
import Performancedisplay from './performance-display/performance-display.jsx';
import Communitymain from './community-main/community-main.jsx';
import Communityfree from './community-free/community-free.jsx';
import Communitydeal from './community-deal/community-deal.jsx';
import Writing from './writing/writing.jsx';
import LoginForm from "./login/login.jsx"; 
import SignupForm from "./signup/signup.jsx"; 
import Mypage from "./mypage/mypage.jsx";
import PerformanceDetailPage from './performance-detail-page/performance-detail-page.jsx';
import FreeBulletinBoard from './free-bulletin-board/free-bulletin-board.jsx';
import TradeBulletinBoard from './trade-bulletin-board/trade-bulletin-board.jsx';
import './App.css';

function App() {
  return (
    /* 2. 전체를 Router(BrowserRouter)로 감싸서 라우팅 환경을 만듭니다. */
    <Router>
      {/* 3. 개별 Route들은 반드시 Routes 태그 안에 모여 있어야 합니다. */}
      <Routes>
        {/* 메인 및 기본 기능 */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/option" element={<Mainoption />} />
        <Route path="/performance" element={<Mainperformance />} />
        
        {/* 로그인, 회원가입, 마이페이지 */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/mypage" element={<Mypage />} />

        {/* 게시판 및 커뮤니티 */}
        <Route path="/free-bulletin-board" element={<FreeBulletinBoard />} />
        <Route path="/trade-bulletin-board" element={<TradeBulletinBoard />} />
        <Route path="/community" element={<Communitymain />} />
        <Route path="/free" element={<Communityfree />} />
        <Route path="/deal" element={<Communitydeal />} />

        {/* 공연 관련 카테고리 */}
        
        <Route path="/performance-detail-page" element={<PerformanceDetailPage />} />
        <Route path="/concert" element={<Performanceconcert />} />
        <Route path="/musical" element={<Performancemusical />} />
        <Route path="/playacting" element={<Performanceplayacting />} />
        <Route path="/festival" element={<Performancefestival />} />
        <Route path="/display" element={<Performancedisplay />} />

        {/* 글쓰기 */}
        <Route path="/writing" element={<Writing />} />
      </Routes>
    </Router>
  );
}

export default App;