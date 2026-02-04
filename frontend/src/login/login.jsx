import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 추가
import './login.css';

// 1. 부모(App.js)로부터 setUserId 함수를 Props로 받아옵니다.
function LoginForm({ setUserId }) {
  const [userIdInput, setUserIdInput] = useState(''); // 입력창용 로컬 상태
  const [userPw, setUserPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  
  const navigate = useNavigate(); // 페이지 이동 함수

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userIdInput) setIdError('아이디를 입력해주세요.');
    else setIdError('');

    if (!userPw) setPwError('비밀번호를 입력해주세요.');
    else setPwError('');

    if (userIdInput && userPw) {
      console.log('로그인 성공:', { userIdInput });
      
      // 2. ⭐ 핵심! 부모(App.js)의 전역 상태를 업데이트합니다.
      // 이렇게 해야 모든 페이지가 이 아이디를 알게 됩니다.
      setUserId(userIdInput); 
      
      // 3. 페이지 이동 (조건부 렌더링 대신 useNavigate 사용 추천)
      navigate('/'); 
    }
  };

  return (
    <div className="inbox">
      <div className="login-box">
        <form id="login" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userid">아이디</label>
            <input 
              type="text" 
              id="userid" 
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
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