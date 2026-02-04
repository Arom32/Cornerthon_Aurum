import React from 'react';
import { Link } from 'react-router-dom';
import './mypage.css'; // 작성한 CSS 파일을 임포트하세요

const MyPage = () => {
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
        
    <div className="mypage-container">
      <div className="content-wrapper">
        <header className="header-section">
          <h1 className="service-logo">티켓 서비스</h1>
          <div className="search-bar-wrapper">
            <input type="text" className="search-input" />
          </div>
        </header>

        <main className="content-body">
          <section className="profile-card">
            <div className="profile-info">
              <div className="avatar-container">
                
              </div>
              <div className="user-header">
                <span className="user-level-name">LV.1 리뷰없이 못살아</span>
                <button className="edit-profile-btn">프로필수정</button>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="action-btn">리뷰 쓰기/확인</button>
              <div className="divider-vertical"></div>
              <button className="action-btn">포인트 확인</button>
            </div>
          </section>

          <nav className="menu-group">
            <ul className="menu-list">
              <li className="menu-item">공지사항</li>
              <li className="menu-item">자주 묻는 질문</li>
              <li className="menu-item">고객상담센터</li>
            </ul>
          </nav>

          <nav className="menu-group">
            <ul className="menu-list">
              <li className="menu-item">이벤트</li>
              <li className="menu-item">기획전</li>
              <li className="menu-item">설정</li>
            </ul>
          </nav>
        </main>
      </div>
    </div>
    </div>
    );
};

export default MyPage;