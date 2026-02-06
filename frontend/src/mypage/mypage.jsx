import React, { useEffect, useState } from 'react';
import './mypage.css';
import Header from '../Header/Header.jsx';
const BACK_URL = import.meta.env.VITE_BACK_URL;

const MyPage = ({ userId }) => {
  const [userData, setUserData] = useState({
    name: '',
    currentTitle: '',
    ownedTitleNames: [],
    loading: true
  });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch(BACK_URL+'/api/user/mypage', {
        method: 'GET',
        // 중요: 쿠키를 서버에 전송하기 위해 필요한 옵션
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json'
        }
        }); // 유저 칭호 및 정보 엔드포인트
        
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        console.log(data)

        setUserData({
        name: data.name,
        title: data.title, 
        loading: false,
        level: data.level,
        point: data.point
        });
      } catch (error) {
        console.error("Fetch Error:", error);
        setUserData(prev => ({ ...prev, loading: false }));
      }
    };

    getUserProfile();
  }, []);

  if (userData.loading) return <div>로딩 중...</div>;


  return (
    <div className="mypage-wrapper">
      {/* 공통 헤더 불러오기 */}
      <Header userId={userId} />

      <div className="mypage-container">
        <div className="content-wrapper">
          
          {/* 프로필 카드 섹션 */}
          <section className="profile-card">
            <div className="profile-main">
              <div className="avatar-wrapper">
                {/* 시안의 귀여운 캐릭터 이미지가 있다면 src에 넣어주세요 */}
                
              </div>
              <div className="profile-text">
                <div className='user-title'>
                    {userData.title}
                  </div>
                <div className="user-info-row">
                  
                  <span className="user-nickname">
                    {userId ? `Lv ${userData.level}.  ${userId}` : "로그인이 필요합니다"}
                  </span>
                  {/* <button className="edit-btn">프로필 수정</button> */}
                </div>
                <div className="stats-row">
                  <div className="stat-item">
                    <span className="stat-label">리뷰 쓰기/확인</span>
                  </div>
                  <div className="divider-v"></div>
                  <div className="stat-item">
                    <span className="stat-label">포인트 확인</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 메뉴 리스트 1 */}
          <nav className="menu-box">
            <ul className="menu-list">
              <li>공지사항 <span className="arrow">→</span></li>
              <li>자주 묻는 질문 <span className="arrow">→</span></li>
              <li>고객상담센터 <span className="arrow">→</span></li>
            </ul>
          </nav>

          {/* 메뉴 리스트 2 */}
          <nav className="menu-box">
            <ul className="menu-list">
              <li>이벤트 <span className="arrow">→</span></li>
              <li>기획전 <span className="arrow">→</span></li>
              <li>설정 <span className="arrow">→</span></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MyPage;