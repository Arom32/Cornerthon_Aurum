import { BrowserRouter, Routes, Route } from "react-router-dom";
// 아래 경로들을 실제 파일 이름(login, signup 등)으로 정확히 수정하세요!
import LoginForm from "./login"; 
import SignupForm from "./signup"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 접속하자마자 회원가입 페이지가 뜨게 설정 */}
        <Route path="/" element={<SignupForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;