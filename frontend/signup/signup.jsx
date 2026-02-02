import React, { useState } from 'react';

function SignupForm() {
    // 상태 관리: 입력 값
    const [formData, setFormData] = useState({
        usermail: '',
        userid: '',
        userpw: '',
        userpw_re: ''
    });

    // 상태 관리: 에러 메시지
    const [errors, setErrors] = useState({
        email: '',
        id: '',
        pw: '',
        pwRe: ''
    });

    // 입력 핸들러
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });

        // 타이핑 시 에러 메시지 초기화
        resetError(id);
    };

    const resetError = (id) => {
        const errorKey = id === 'usermail' ? 'email' : 
                         id === 'userid' ? 'id' : 
                         id === 'userpw' ? 'pw' : 'pwRe';
        setErrors(prev => ({ ...prev, [errorKey]: '' }));
    };

    // 유효성 검사
    const validate = () => {
        let isValid = true;
        const newErrors = { email: '', id: '', pw: '', pwRe: '' };

        // 이메일 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.usermail) {
            newErrors.email = '이메일을 입력해주세요.';
            isValid = false;
        } else if (!emailRegex.test(formData.usermail)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다.';
            isValid = false;
        }

        // 아이디 검사
        if (formData.userid.length < 4) {
            newErrors.id = '아이디는 4자 이상이어야 합니다.';
            isValid = false;
        }

        // 비밀번호 검사
        if (formData.userpw.length < 6) {
            newErrors.pw = '비밀번호는 6자 이상이어야 합니다.';
            isValid = false;
        }

        // 비밀번호 재확인
        if (formData.userpw !== formData.userpw_re) {
            newErrors.pwRe = '비밀번호가 일치하지 않습니다.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('회원가입 데이터:', formData);
            alert('회원가입이 완료되었습니다!');
        }
    };

    return (
        <div className="inbox">
            <div className="signup-box">
                <form name="signup" onSubmit={handleSubmit} id="signup-form">
                    
                    <div className="form-group">
                        <label htmlFor="usermail">이메일</label>
                        <input 
                            type="text" 
                            id="usermail" 
                            value={formData.usermail}
                            onChange={handleChange}
                            placeholder="example@mail.com"
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
                        <a href="#">로그인</a>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default SignupForm;