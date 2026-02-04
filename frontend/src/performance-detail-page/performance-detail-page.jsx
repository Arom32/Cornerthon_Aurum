import React, { useState, useEffect } from 'react';
import './performance-detail-page.css';
import { Link } from 'react-router-dom';

const PerformanceDetailPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 불러오기 함수
  const getPostData = async () => {
    try {
      setLoading(true);
      const response = await fetch('API_주소를_여기에_입력하세요');
      
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      setPosts(data); 
      setLoading(false);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="logo"> 
          <span>AURUM</span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="검색어를 입력하세요" />
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <nav className="section">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
          <Link to="/mypage">my page</Link>
        </nav>
      </header>

      <div className="board-container">
        <header className="board-header">
          <h1 className="main-title">거래 게시판</h1>
          <p className="sub-title">궁금한 모든것을 물어보세요.</p>
        </header>

        <div className="board-controls">
          {/* 글쓰기 버튼 유지 (필요 없으시면 이 버튼 태그 자체를 지우셔도 됩니다) */}
          <button className="write-btn">글쓰기</button>
          
          <div className="search-area">
            <input type="text" className="search-input" placeholder="검색어를 입력하세요" />
            <button className="search-btn">
              검색 
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ transform: 'translateY(3px)' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="board-table">
            <thead>
              <tr>
                <th className="col-id">번호</th>
                <th className="col-title">제목</th>
                <th className="col-date">등록일</th>
                <th className="col-view">조회</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="status-msg">로딩 중...</td></tr>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className={post.isNotice ? 'notice-row' : ''}>
                    <td className="col-id">
                      {post.isNotice ? <span className="notice-badge">공지</span> : post.id}
                    </td>
                    <td className="col-title text-left">
                      <a href={`/board/${post.id}`} className="post-link">{post.title}</a>
                    </td>
                    <td className="col-date">{post.date}</td>
                    <td className="col-view">{post.views}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="status-msg">등록된 게시글이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* ModalTradeBoard 컴포넌트 호출 삭제됨 */}
    </div>
  );
};

export default PerformanceDetailPage;