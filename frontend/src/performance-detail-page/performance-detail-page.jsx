import React, { useState, useEffect } from 'react';
import './performance-detail-Page.css';
import Header from '../Header/Header.jsx';
import CategoryBar from '../CategoryBar/CategoryBar.jsx';

const PerformanceDetailPage = () => {
  const [performanceInfo, setPerformanceInfo] = useState(null);

  useEffect(() => {

    /*ㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈ임시API호출*/
    fetch('http://localhost:3000/api/performances/PF284135') 
      .then((response) => response.json())
      .then((result) => {
        // [수정] 백엔드 데이터 구조가 { success: true, data: { ... } } 이므로 
        // result.data를 상태에 저장해야 합니다.
        if (result.success) {
          setPerformanceInfo(result.data);
        }
      })
      .catch((err) => console.error("API 데이터 호출 실패:", err));
  }, []);

  if (!performanceInfo) return <div>공연 정보를 불러오는 중...</div>;

  return (
    <div className="detail-page-container">
      <Header />
      <CategoryBar />

      <div className="detail-content-wrapper">
        <div className="detail-main-section">
          <div className="poster-area">
            {/* [수정] imageUrl 대신 poster 필드 연결 */}
            {performanceInfo.poster ? (
              <img src={performanceInfo.poster} alt="공연 포스터" className="poster-img" />
            ) : (
              <div className="poster-placeholder"></div>
            )}
          </div>

          <div className="info-text-section">
            {/* [수정] title 대신 prfnm 연결 */}
            <h2 className="info-title"> {performanceInfo.prfnm} </h2>
            <div className="title-underline"></div>
            
            <table className="info-table">
              <tbody>
                <tr>
                  <th>장소</th>
                  {/* [수정] location 대신 fcltynm 연결 */}
                  <td>{performanceInfo.fcltynm}</td>
                </tr>
                <tr>
                  <th>기간</th>
                  {/* [수정] period 대신 날짜 필드 연결 */}
                  <td>{performanceInfo.prfpdfrom} ~ {performanceInfo.prfpdto}</td>
                </tr>
                <tr>
                  <th>공연 상태</th>
                  {/* [수정] time 대신 prfstate 연결 */}
                  <td>{performanceInfo.prfstate}</td>
                </tr>
                <tr>
                  <th>공연 지역</th>
                  {/* [수정] limit 대신 area 연결 */}
                  <td>{performanceInfo.area}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDetailPage;
