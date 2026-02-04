import { Routes, Route } from 'react-router-dom'; // Router(BrowserRouter) 삭제
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
import './App.css';

function App() {
  return (
    // <Router> 태그가 여기에 절대 있으면 안 됩니다. 
    // 오직 <Routes>만 있어야 합니다.
    <Routes>
        {/* 메인 기능 */}
        <Route path="/" element={<Mainpage/>}/>
        <Route path="/option" element={<Mainoption/>}/>
        <Route path="/performance" element={<Mainperformance/>}/>
        {/* 공연 기능 */}
        <Route path="/concert" element={<Performanceconcert/>}/>
        <Route path="/musical" element={<Performancemusical/>}/>
        <Route path="/playacting" element={<Performanceplayacting/>}/>
        <Route path="/festival" element={<Performancefestival/>}/>
        <Route path="/display" element={<Performancedisplay/>}/>
        {/* 커뮤니티 */}
        <Route path="/community" element={<Communitymain/>}/>
        <Route path="/free" element={<Communityfree/>}/>
        <Route path="/deal" element={<Communitydeal/>}/>
        {/* 글쓰기 */}
        <Route path="/writing" element={<Writing/>}/>
        {/* 로그인 및 회원가입 */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}

export default App;