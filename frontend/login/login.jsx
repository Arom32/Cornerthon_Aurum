import React, { useState } from 'react';
import './login.css'; // CSS 파일명이 다르면 수정하세요!

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { userId, userPw });
    // 추후 백엔드 API 연결 부분
  };

  return (
    <div className="inbox">
      <div className="login-box">
        <form onSubmit={handleSubmit} id="login">
          <div className="form-group">
            <label htmlFor="userid">아이디</label>
            <input 
              type="text" 
              id="userid" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="userpw">비밀번호</label>
            <input 
              type="password" 
              id="userpw" 
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)} 
            />
          </div>
          <button type="submit" className="login-button">로그인</button>
          <div className="signup-link">
            <span>계정이 없으신가요?</span>
            <a href="/signup">회원가입</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;