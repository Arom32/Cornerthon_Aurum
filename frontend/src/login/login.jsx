import React, { useState } from 'react';
import MainPage from "../main-page/main-page.jsx"; // 메인 페이지 컴포넌트 임포트
import './login.css';

function LoginForm() {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  
  // 1. 로그인 성공 여부를 저장할 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) setIdError('아이디를 입력해주세요.');
    else setIdError('');

    if (!userPw) setPwError('비밀번호를 입력해주세요.');
    else setPwError('');

    if (userId && userPw) {
      console.log('로그인 성공:', { userId });
      // 2. 로그인 성공 시 상태 업데이트
      setIsLoggedIn(true); 
    }
  };

  // 3. 조건부 렌더링: 로그인 상태라면 MainPage를 보여줌
  if (isLoggedIn) {
    return <MainPage userId={userId} />;
  }

  // 로그인되지 않았을 때만 아래 Form 출력
  return (
    <div className="inbox">
      <div className="login-box">
        <form id="login" onSubmit={handleSubmit}>
          {/* ... 기존 input 태그들 ... */}
          <div className="form-group">
            <label htmlFor="userid">아이디</label>
            <input 
              type="text" 
              id="userid" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            {idError && <p className="error-message">{idError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="userpw">비밀번호</label>
            <input 
              type="password" 
              id="userpw" 
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
            />
            {pwError && <p className="error-message">{pwError}</p>}
          </div>

          <button type="submit" className="login-button">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;