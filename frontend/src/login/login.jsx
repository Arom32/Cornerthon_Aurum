import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const BACK_URL = import.meta.env.VITE_BACK_URL;

// 부모로부터 setUserId를 props로 받는다고 가정합니다.
function LoginForm({ setUserId }) {
  const [userIdInput, setUserIdInput] = useState(''); // 입력창용 로컬 상태
  const [userPw, setUserPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 에러 상태 초기화
    setIdError('');
    setPwError('');

    // 유효성 검사
    if (!userIdInput) {
      setIdError('아이디를 입력해주세요.');
      return;
    }
    if (!userPw) {
      setPwError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      // BACK_URL을 사용하거나 localhost를 사용 (환경에 맞게 조절)
      const response = await fetch(`${BACK_URL || 'http://localhost:5000'}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userIdInput,
          password: userPw,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인 서버 에러');
      }

      const result = await response.json();

      if (result.success) {
        alert('로그인에 성공했습니다!');
        // 부모 상태 업데이트 및 페이지 이동
        if (setUserId) setUserId(userIdInput);
        navigate('/');
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

          <button type="submit" className="login-button">
            로그인
          </button>

          <div className="signup-link">
            <span>계정이 없으신가요? </span>
            <a href="#" style={{ color: '#5235A8', fontWeight: '600', textDecoration: 'none' }}>
              회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;