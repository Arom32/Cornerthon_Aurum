import React, { useState } from 'react'; // useState 추가
import { Routes, Route } from 'react-router-dom';
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
import FreeBulletinBoard from './free-bulletin-board/free-bulletin-board.jsx';
import TradeBulletinBoard from './trade-bulletin-board/trade-bulletin-board.jsx';
import './App.css';

import PerformanceDetailPage from './performance-detail-page/performance-detail-page.jsx'; // 1. 상세 페이지 임포트 추가

function App() {
  // 1. 모든 페이지가 공유할 로그인 아이디 상태
  const [userId, setUserId] = useState('');

  return (
    <Routes>
      {/* 2. 각 컴포넌트에 userId와 setUserId를 Props로 전달 */}
      <Route path="/" element={<Mainpage userId={userId} />} />
      <Route path="/main-option" element={<Mainoption userId={userId} />} />


      <Route path="/main-performance" element={<Mainperformance userId={userId} />} />
      
      {/*수영언니한테 detail뒤에 -page 붙이락 전달하긩*/}
      <Route path="/performance-detail-page" element={<PerformanceDetailPage userId={userId} />} />

      {/* LoginForm은 아이디를 '저장'해야 하므로 setUserId를 넘겨줌 */}
      <Route path="/login" element={<LoginForm setUserId={setUserId} />} />
      <Route path="/signup" element={<SignupForm />} />
      
      {/* Mypage는 저장된 아이디를 '보여줘야' 하므로 userId를 넘겨줌 */}
      <Route path="/mypage" element={<Mypage userId={userId} />} />

      <Route path="/performance-concert" element={<Performanceconcert userId={userId} />} />
      <Route path="/performance-musical" element={<Performancemusical userId={userId} />} />
      <Route path="/performance-playacting" element={<Performanceplayacting userId={userId} />} />
      <Route path="/performance-festival" element={<Performancefestival userId={userId} />} />
      <Route path="/performance-display" element={<Performancedisplay userId={userId} />} />

      <Route path="/community-main" element={<Communitymain userId={userId} />} />
      <Route path="/community-free" element={<Communityfree userId={userId} />} />
      <Route path="/community-deal" element={<Communitydeal userId={userId} />} />
      <Route path="/free-bulletin-board" element={<FreeBulletinBoard userId={userId} />} />
      <Route path="/trade-bulletin-board" element={<TradeBulletinBoard userId={userId} />} />

      <Route path="/writing/:id" element={<Writing userId={userId} />} />
    </Routes>
  );
}

export default App;