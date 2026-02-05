import React, { useState } from 'react';
import './signup.css';

const Signup = () => {
  // 1. 초기값 설정: 이메일은 완전히 제거하고, 빈 문자열('')로 초기화하여 경고 방지
  const [formData, setFormData] = useState({
    userid: '',
    userpw: '',
    userpw_re: ''
  });

  const [errors, setErrors] = useState({
    id: '',
    pw: '',
    pwRe: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let newErrors = { id: '', pw: '', pwRe: '' };
    let isValid = true;

    // 유효성 검사
    if (formData.userid.length < 4) {
      newErrors.id = '아이디는 4글자 이상이어야 합니다.';
      isValid = false;
    }
    if (formData.userpw.length < 6) {
      newErrors.pw = '비밀번호는 6글자 이상이어야 합니다.';
      isValid = false;
    }
    if (formData.userpw !== formData.userpw_re) {
      newErrors.pwRe = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        // 2. Swagger 규격에 맞춘 데이터 전송 (username, password1, password2)
        const response = await fetch('http://localhost:5000/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.userid,
            password1: formData.userpw,
            password2: formData.userpw_re
          }),
        });

        const contentType = response.headers.get("content-type");
        
        // 서버 응답 처리
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || '회원가입 실패');
          }

          alert('회원가입 성공! 로그인 페이지로 이동합니다.');
          window.location.href = '/login'; 
        } else {
          // JSON이 아닌 HTML(에러페이지)이 온 경우 - 500 에러 발생 시 여기로 들어옵니다.
          throw new Error('서버 내부 오류(500)가 발생했습니다. 백엔드 터미널 로그를 확인해 주세요.');
        }

      } catch (error) {
        console.error('Fetch 에러:', error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="inbox">
      <div className="signup-box">
        <form id="signup-form" onSubmit={handleSubmit}>
          
          {/* 아이디 입력 */}
          <div className="form-group">
            <label htmlFor="userid">아이디</label>
            <input 
              type="text" 
              id="userid" 
              value={formData.userid}
              onChange={handleChange}
              placeholder="4글자 이상 입력"
            />
            <p className="error-message">{errors.id}</p>
          </div>

          {/* 비밀번호 입력 */}
          <div className="form-group">
            <label htmlFor="userpw">비밀번호</label>
            <input 
              type="password" 
              id="userpw" 
              value={formData.userpw}
              onChange={handleChange}
              placeholder="6글자 이상 입력"
            />
            <p className="error-message">{errors.pw}</p>
          </div>

          {/* 비밀번호 재확인 입력 */}
          <div className="form-group">
            <label htmlFor="userpw_re">비밀번호 재확인</label>
            <input 
              type="password" 
              id="userpw_re" 
              value={formData.userpw_re}
              onChange={handleChange}
              placeholder="비밀번호 다시 입력"
            />
            <p className="error-message">{errors.pwRe}</p>
          </div>
          
          <button type="submit" className="signup-button">회원가입</button>

          <div className="login-link">
            <span>이미 계정이 있으신가요? </span>
            <a href="/login" style={{ color: '#6e45e2', fontWeight: 'bold' }}>로그인</a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;