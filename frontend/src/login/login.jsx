import React, { useState } from 'react';
import './login.css'; // CSS 파일이 같은 폴더에 있다고 가정합니다.

const BACK_URL = import.meta.env.VITE_BACK_URL

function LoginForm() {
  // 아이디와 비밀번호 상태 관리
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. 에러 상태 초기화 (중요!)
    setIdError('');
    setPwError('');

    // 2. 유효성 검사
    if (!userId) {
      setIdError('아이디를 입력해주세요.');
      return;
    }
    if (!userPw) {
      setPwError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userId,
          password: userPw,
        }),
      });

      // HTTP 상태 코드가 200~299가 아닐 경우 처리
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인 서버 에러');
      }

      const result = await response.json();

      // 백엔드 응답 구조에 맞게 조건문 수정
      if (result.success) {
        alert('로그인에 성공했습니다!');
        // 토큰 저장 로직 (예: localStorage.setItem('token', result.token))
      } else {
        alert(result.message || '로그인 정보를 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 통신 에러:', error);
      alert(error.message || '서버와 통신 중 에러가 발생했습니다.');
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
            <a href="#" style={{ color: '#5235A8', fontWeight: '600', textDecoration: 'none' }}>회원가입</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;