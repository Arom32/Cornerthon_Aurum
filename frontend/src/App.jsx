import React from 'react';
import LoginForm from '../login/login'; // 현재 src 폴더보다 한 칸 위에 있는 login 폴더를 찾아갑니다.
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 기본 샘플은 다 치우고, 채원 님이 만든 로그인 폼만 보여줍니다! */}
      <LoginForm />
    </div>
  );
}

export default App;