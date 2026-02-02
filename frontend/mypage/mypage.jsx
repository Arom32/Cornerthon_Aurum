import React, { useState } from 'react';

return (
    <div className="container">
            {/* 상단 헤더 */}
            <header className="header">
                <div className="logo">AURUM</div>
                <div className="search-bar">
                    <input type="text" placeholder="검색어를 입력하세요"/>
                </div>
                <nav className="section">
                    <Link to="/login">로그인</Link>
                    <Link to="/signup">회원가입</Link>
                    <Link to="/mypage">my page</Link>
                    
                </nav>
            </header>
    </div>
)