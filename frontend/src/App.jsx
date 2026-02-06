import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Mainpage from './main-page/main-page.jsx';
import Mainoption from './main-option/main-option.jsx';
import Mainperformance from './main-performance/main-performance.jsx';
import Performanceconcert from './performance-concert/performance-concert.jsx';
import Performancemusical from './performance-musical/performance-musical.jsx';
import Performanceplayacting from './performance-playacting/performance-playacting.jsx';
import Performancefestival from './performance-festival/performance-festival.jsx';
import Performancedisplay from './performance-display/performance-display.jsx';
import PerformanceList from './performance-list/performance-list.jsx';
import Communitymain from './community-main/community-main.jsx';
import Communityfree from './community-free/community-free.jsx';
import Communitydeal from './community-deal/community-deal.jsx';
import Writing from './writing/writing.jsx';
import LoginForm from "./login/login.jsx"; 
import SignupForm from "./signup/signup.jsx"; 
import Mypage from "./mypage/mypage.jsx";
import FreeBulletinBoard from './free-bulletin-board/free-bulletin-board.jsx';
import TradeBulletinBoard from './trade-bulletin-board/trade-bulletin-board.jsx';
import PerformanceDetailPage from './performance-detail-page/performance-detail-page.jsx';
import './App.css';

function App() {
  // 1. 공통 상태 관리
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL || 'http://localhost:5000'}/api/user/mypage`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          setUserId(result.name); // 서버 응답 데이터에 맞춰 result.id 또는 result.name 사용
        }
      } catch (error) {
        console.error("인증 확인 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* 메인 및 기본 기능 */}
      <Route path="/" element={<Mainpage userId={userId} />} />
      <Route path="/main-option" element={<Mainoption userId={userId} />} />
      <Route path="/main-performance" element={<Mainperformance userId={userId} />} />

      {/* 로그인, 회원가입, 마이페이지 */}
      <Route path="/login" element={<LoginForm setUserId={setUserId} />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/mypage" element={<Mypage userId={userId} />} />

      {/* 공연 관련 */}
      <Route path="/concert" element={<PerformanceList userId={userId} />} />
      <Route path="/musical" element={<Performancemusical userId={userId} />} />
      <Route path="/playacting" element={<Performanceplayacting userId={userId} />} />
      <Route path="/festival" element={<Performancefestival userId={userId} />} />
      <Route path="/display" element={<Performancedisplay userId={userId} />} />
      <Route path="/performance/:id" element={<PerformanceDetailPage userId={userId} />} />

      {/* 커뮤니티 및 게시판 */}
      <Route path="/community-main" element={<Communitymain userId={userId} />} />
      <Route path="/community-free" element={<Communityfree userId={userId} />} />
      <Route path="/community-deal" element={<Communitydeal userId={userId} />} />
      <Route path="/free-bulletin-board" element={<FreeBulletinBoard userId={userId} />} />
      <Route path="/trade-bulletin-board" element={<TradeBulletinBoard userId={userId} />} />

      {/* 글쓰기 (상세보기와 일반 작성) */}
      <Route path="/writing" element={<Writing userId={userId} />} />
      <Route path="/writing/:id" element={<Writing userId={userId} />} />
    </Routes>
  );
}

export default App;