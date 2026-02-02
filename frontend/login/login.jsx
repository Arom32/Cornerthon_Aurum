import React, { useState } from 'react';
import './login.css'; 

function LoginForm() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validateUserId = (id) => {
        if (id.trim() === '') {
            setIdError('아이디를 입력해주세요.');
            return false;
        }
        if (id.length < 4) {
            setIdError('아이디는 4자 이상이어야 합니다.');
            return false;
        }
        setIdError('');
        return true;
    };

    const validateUserPw = (pw) => {
        if (pw.trim() === '') {
            setPwError('비밀번호를 입력해주세요.');
            return false;
        }
        if (pw.length < 6) {
            setPwError('비밀번호는 6자 이상이어야 합니다.');
            return false;
        }
        setPwError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isUserIdValid = validateUserId(userId);
        const isUserPwValid = validateUserPw(userPw);

        if (isUserIdValid && isUserPwValid) {
            console.log('로그인 시도:', { userId, userPw });
            alert('로그인 성공!');
        }
    };

    return (
        <div className="login-wrapper">
            <h1 className="logo">{/* 로고 자리 */}</h1>
            <div className="inbox">
                <div className="login-box">
                    <form name="login" onSubmit={handleSubmit} id="login">
                        
                        <div className="form-group">
                            <label htmlFor="userid">아이디</label>
                            <input 
                                type="text" 
                                id="userid"
                                value={userId}
                                onChange={(e) => {
                                    setUserId(e.target.value);
                                    if (idError) setIdError('');
                                }}
                                onBlur={() => userId && validateUserId(userId)}
                                placeholder="아이디를 입력하세요"
                            />
                            {idError && <p className="error-message">{idError}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="userpw">비밀번호</label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="userpw"
                                    value={userPw}
                                    onChange={(e) => {
                                        setUserPw(e.target.value);
                                        if (pwError) setPwError('');
                                    }}
                                    onBlur={() => userPw && validateUserPw(userPw)}
                                    placeholder="비밀번호를 입력하세요"
                                    style={{ width: '100%', paddingRight: '40px' }} // 아이콘 자리를 위해 오른쪽 패딩 추가
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0'
                                    }}
                                >
                                    {/* showPassword 상태에 따라 다른 SVG 노출 */}
                                    {showPassword ? (
                                        /* 눈 뜬 모양 (비밀번호 보임 상태 -> 누르면 숨김) */
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    ) : (
                                        /* 눈에 슬래시 모양 (비밀번호 숨김 상태 -> 누르면 보임) */
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {pwError && <p className="error-message">{pwError}</p>}
                        </div>

                        <button type="submit" className="login-button">로그인</button>

                        <div className="signup-link">
                            <span>계정이 없으신가요? </span>
                            <a href="#">회원가입</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;