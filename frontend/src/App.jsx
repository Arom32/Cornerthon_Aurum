import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'; // useEffect 추가
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
  // 64번 줄 에러 해결: 함수는 return문 밖, App 함수 바로 아래에 있어야 합니다.
  const checkLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL || 'http://localhost:5000'}/api/user/mypage`, {
        method: 'GET',
        credentials: 'include', // 중요: 쿠키 포함
      });
      const data = await response.json();
      console.log("로그인 확인:", data);
    } catch (error) {
      console.error("로그인 체크 실패:", error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/option" element={<Mainoption />} />
      <Route path="/performance" element={<Mainperformance />} />
      <Route path="/concert" element={<Performanceconcert />} />
      <Route path="/musical" element={<Performancemusical />} />
      <Route path="/playacting" element={<Performanceplayacting />} />
      <Route path="/festival" element={<Performancefestival />} />
      <Route path="/display" element={<Performancedisplay />} />
      <Route path="/community" element={<Communitymain />} />
      <Route path="/free" element={<Communityfree />} />
      <Route path="/deal" element={<Communitydeal />} />
      <Route path="/free-bulletin-board" element={<FreeBulletinBoard />} />
      <Route path="/trade-bulletin-board" element={<TradeBulletinBoard />} />
      <Route path="/writing" element={<Writing />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}

export default App;