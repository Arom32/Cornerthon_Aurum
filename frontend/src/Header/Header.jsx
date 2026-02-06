import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header.css'; 
// import M1 from '../assets/m 1.svg';

const Header = ({ userId, setUserId }) => {
    const navigate = useNavigate();

    // 로그아웃 핸들러 로직
    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL || 'http://localhost:5000'}/api/user/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                alert('로그아웃 되었습니다.');
                window.location.href = '/'; 
            }
        } catch (error) {
            console.error('로그아웃 에러:', error);
        }
    };

    return (
        <header className="header">
            <Link to="/" className="logo">AURUM</Link>
            {/* <div className='logo-box'>
                 <img src={M1} alt="로고" />
            </div> */}
            <div className="search-bar">
                <input type="text" placeholder="검색어를 입력하세요"/>
            </div>
            
            <nav className="section">
                {/* userId가 존재하면 유저이름과 마이페이지만 표시 */}
                {userId ? (
                    <>
                        <span className="user-id-display">{userId}님</span>
                        <Link to="/mypage">내 페이지</Link>
                        {/* 로그아웃은 동작(Action)이므로 button으로 구현 */}
                        <button 
                            onClick={handleLogout} 
                            className="logout-button"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    /* userId가 없으면(로그인 안된 상태) 로그인과 회원가입 표시 */
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;