import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 
// import M1 from '../assets/m 1.svg';
const Header = () => {
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
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
                <Link to="/mypage">my page</Link> 
            </nav>
        </header>
    );
};
export default Header;