import React, { useState, useEffect } from 'react';
import './performance-detail-page.css'; // 이 파일이 옆에 있어야 합니다.
import Header from '../Header/Header.jsx';
import CategoryBar from '../CategoryBar/CategoryBar.jsx';

const PerformanceDetailPage = () => {
  const [performanceInfo, setPerformanceInfo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/performances/PF284135') 
      .then((response) => response.json())
      .then((result) => {
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
            {performanceInfo.poster ? (
              <img src={performanceInfo.poster} alt="공연 포스터" className="poster-img" />
            ) : (
              <div className="poster-placeholder"></div>
            )}
          </div>

          <div className="info-text-section">
            <h2 className="info-title"> {performanceInfo.prfnm} </h2>
            <div className="title-underline"></div>
            
            <table className="info-table">
              <tbody>
                <tr>
                  <th>장소</th>
                  <td>{performanceInfo.fcltynm}</td>
                </tr>
                <tr>
                  <th>기간</th>
                  <td>{performanceInfo.prfpdfrom} ~ {performanceInfo.prfpdto}</td>
                </tr>
                <tr>
                  <th>공연 상태</th>
                  <td>{performanceInfo.prfstate}</td>
                </tr>
                <tr>
                  <th>공연 지역</th>
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