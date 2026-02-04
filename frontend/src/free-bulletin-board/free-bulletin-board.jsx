import React, { useState, useEffect } from 'react';
import './free-bulletin-board.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';

const FreeBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 불러오기 함수 (fetch 사용) 그 axios 깔아야해서 그냥 fetch로 했음
  const getPostData = async () => {
    try {
      setLoading(true);
      
      // API 주소 삽입 자리
      const response = await fetch('API_주소를_여기에_입력하세요');
      
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      setPosts(data); 
      
      setLoading(false);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      // API 연결 전까지 화면을 확인하고 싶다면 아래 주석을 해제하세요
      /*
      setPosts([
        { id: '공지', title: '[공지] fetch 테스트 데이터입니다.', date: '2026-02-03', views: 0, isNotice: true },
        { id: 1, title: '게시판이 잘 나오나요?', date: '2026-02-03', views: 5, isNotice: false }
      ]);
      */
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="container">
    <Header/>
    <div className="board-container">
      <header className="board-header">
        <h1 className="main-title">자유 게시판</h1>
        <p className="sub-title">궁금한 모든것을 물어보세요.</p>
      </header>

      <div className="board-controls">
        <button className="write-btn">글쓰기</button>
        <div className="search-area">
          <input type="text" className="search-input" placeholder="검색어를 입력하세요" />
          <button className="search-btn">검색 <svg 
  width="18" 
  height="18" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round"
  style={{ transform: 'translateY(3px)' }} // 💡 2px만큼 아래로 이동
>
  <circle cx="11" cy="11" r="8"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
</svg></button>
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
    </div>
  );
};

export default FreeBoard;