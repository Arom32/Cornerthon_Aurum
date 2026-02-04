import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 추가
import './login.css';

fe/performance-detail-page
const BACK_URL = import.meta.env.VITE_BACK_URL

function LoginForm() {
  // 아이디와 비밀번호 상태 관리
  const [userId, setUserId] = useState('');

// 1. 부모(App.js)로부터 setUserId 함수를 Props로 받아옵니다.
function LoginForm({ setUserId }) {
  const [userIdInput, setUserIdInput] = useState(''); // 입력창용 로컬 상태
 main
  const [userPw, setUserPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  
  const navigate = useNavigate(); // 페이지 이동 함수

 fe/performance-detail-page
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
 main
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
 fe/performance-detail-page

          <div className="signup-link">
            <span>계정이 없으신가요? </span>
            <a href="#" style={{ color: '#5235A8', fontWeight: '600', textDecoration: 'none' }}>회원가입</a>
          </div>

 main
        </form>
      </div>
    </div>
  );
}

export default LoginForm;