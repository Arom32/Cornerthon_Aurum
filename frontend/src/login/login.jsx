import React, { useState } from 'react';
import './login.css'; // CSS 파일이 같은 폴더에 있다고 가정합니다.

function LoginForm() {
  // 아이디와 비밀번호 상태 관리
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 간단한 유효성 검사 로직
    if (!userId) {
      setIdError('아이디를 입력해주세요.');
    } else {
      setIdError('');
    }

    if (!userPw) {
      setPwError('비밀번호를 입력해주세요.');
    } else {
      setPwError('');
    }

    if (userId && userPw) {
      console.log('로그인 시도:', { userId, userPw });
      // 여기에 API 호출 로직을 넣으시면 됩니다.
    }
  };

  return (
    <div className="inbox">
      <div className="login-box">
        <h1 className="logo">{/* 로고가 필요하면 여기에 SVG 등을 넣으세요 */}</h1>
        
        <form id="login" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userid">아이디</label>
            <input 
              type="text" 
              id="userid" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            {idError && <p className="error-message" style={{display: 'block'}}>{idError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="userpw">비밀번호</label>
            <input 
              type="password" 
              id="userpw" 
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
            />
            {pwError && <p className="error-message" style={{display: 'block'}}>{pwError}</p>}
          </div>

          <div className="options">
            <label className="auto-login">
              <input type="checkbox" />
              <span>자동 로그인</span>
            </label>
            <a href="#" className="forgot-pw">비밀번호 찾기</a>
          </div>

          <button type="submit" className="login-button">로그인</button>

          <div className="signup-link">
            <span>계정이 없으신가요? </span>
            <a href="#" style={{ color: '#5235A8;', fontWeight: '600', textDecoration: 'none' }}>회원가입</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;