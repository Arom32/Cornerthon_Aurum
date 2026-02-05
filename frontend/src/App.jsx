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

function App() {
  return (
    <Routes>
      {/* 메인 및 기본 기능 */}
      <Route path="/" element={<Mainpage />} />
      <Route path="/option" element={<Mainoption />} />
      <Route path="/performance" element={<Mainperformance />} />

      {/* 공연 관련 카테고리 */}
      <Route path="/concert" element={<Performanceconcert />} />
      <Route path="/musical" element={<Performancemusical />} />
      <Route path="/playacting" element={<Performanceplayacting />} />
      <Route path="/festival" element={<Performancefestival />} />
      <Route path="/display" element={<Performancedisplay />} />

      {/* 커뮤니티 및 게시판 */}
      <Route path="/community" element={<Communitymain />} />
      <Route path="/free" element={<Communityfree />} />
      <Route path="/deal" element={<Communitydeal />} />
      <Route path="/free-bulletin-board" element={<FreeBulletinBoard />} />
      <Route path="/trade-bulletin-board" element={<TradeBulletinBoard />} />

      {/* 글쓰기 */}
      <Route path="/writing" element={<Writing />} />

      {/* 로그인, 회원가입, 마이페이지 */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}

export default App;