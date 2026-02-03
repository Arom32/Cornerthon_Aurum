import { Routes, Route } from "react-router-dom";
import LoginForm from "./login/login.jsx"; 
import SignupForm from "./signup/signup.jsx"; 
import Mypage from "./mypage/mypage.jsx";
// 파일 최상단 import 문들 사이에 추가
import { Link } from 'react-router-dom';
import FreeBulletinBoard from './free-bulletin-board/free-bulletin-board.jsx';

// 만약 원격(깃허브)에 다른 페이지가 있었다면 여기에 추가로 import 하세요.

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/free-bulletin-board" element={<FreeBulletinBoard />} />
      
      {/* 다른 팀원이 추가한 Route가 있다면 여기에 남겨두세요 */}
    </Routes>
  );
}

export default App;