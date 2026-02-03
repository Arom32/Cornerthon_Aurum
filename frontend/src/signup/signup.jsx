import React, { useState } from 'react';
import './signup.css'; // 같은 폴더의 CSS를 불러옵니다.

const Signup = () => {
  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    usermail: '',
    userid: '',
    userpw: '',
    userpw_re: ''
  });

  // 에러 메시지 상태 관리
  const [errors, setErrors] = useState({
    email: '',
    id: '',
    pw: '',
    pwRe: ''
  });

  // 입력값이 변경될 때 호출되는 함수
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let newErrors = { email: '', id: '', pw: '', pwRe: '' };
    let isValid = true;

    // 간단한 유효성 검사 예시
    if (!formData.usermail.includes('@')) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
      isValid = false;
    }
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
      alert('회원가입 성공!');
      console.log('제출된 데이터:', formData);
    }
  };

  return (
    <div className="inbox">
      <div className="signup-box">
        <form id="signup-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="usermail">이메일</label>
            <input 
              type="text" 
              id="usermail" 
              value={formData.usermail}
              onChange={handleChange}
            />
            <p className="error-message">{errors.email}</p>
          </div>

          <div className="form-group">
            <label htmlFor="userid">아이디</label>
            <input 
              type="text" 
              id="userid" 
              value={formData.userid}
              onChange={handleChange}
            />
            <p className="error-message">{errors.id}</p>
          </div>

          <div className="form-group">
            <label htmlFor="userpw">비밀번호</label>
            <input 
              type="password" 
              id="userpw" 
              value={formData.userpw}
              onChange={handleChange}
            />
            <p className="error-message">{errors.pw}</p>
          </div>

          <div className="form-group">
            <label htmlFor="userpw_re">비밀번호 재확인</label>
            <input 
              type="password" 
              id="userpw_re" 
              value={formData.userpw_re}
              onChange={handleChange}
            />
            <p className="error-message">{errors.pwRe}</p>
          </div>
          
          <button type="submit" className="signup-button">회원가입</button>

          <div className="login-link">
            <span>이미 계정이 있으신가요? </span>
            <a href="/login">로그인</a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;