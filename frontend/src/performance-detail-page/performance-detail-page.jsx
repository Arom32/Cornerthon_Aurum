import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './performance-detail-page.css';
import Header from '../Header/Header.jsx';
import CategoryBar from '../CategoryBar/CategoryBar.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL;

const PerformanceDetailPage = () => {
  // 1. 여기서 URL의 :id(예: PF284146)를 자동으로 가져옵니다.
  const { id } = useParams(); 
  const [performanceInfo, setPerformanceInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // 2. 질문하신 fetch 로직이 이미 여기에 async/await 형태로 구현되어 있습니다.
        const response = await fetch(`${BACK_URL}/api/performances/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setPerformanceInfo(result.data);
        }
      } catch (err) {
        console.error("데이터 호출 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]); // id가 바뀔 때마다 실행

  // 로딩 및 데이터 없음 처리
  if (loading) return <div className="loading">공연 정보를 불러오는 중...</div>;
  if (!performanceInfo) return <div className="error">공연 정보가 없습니다.</div>;

  return (
    <div className="detail-page-container">
      <Header />
      <CategoryBar />

      <div className="detail-content-wrapper">
        <div className="detail-main-section">
          <div className="poster-area">
            <img 
              src={performanceInfo.poster} 
              alt={performanceInfo.prfnm} 
              className="poster-img" 
            />
          </div>

          <div className="info-text-section">
            <h2 className="info-title">{performanceInfo.prfnm}</h2>
            <p className="genre-tag">#{performanceInfo.genrenm}</p>
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
                  <th>조회수</th>
                  <td>{performanceInfo.viewCount}회</td>
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