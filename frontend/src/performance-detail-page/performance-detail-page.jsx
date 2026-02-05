import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './performance-detail-page.css';
import Header from '../Header/Header.jsx';
import CategoryBar from '../CategoryBar/CategoryBar.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL;

const PerformanceDetailPage = () => {
  const { id } = useParams(); 
  const [performanceInfo, setPerformanceInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // Swagger에서 제공된 API 엔드포인트로 호출
        const response = await fetch(`${BACK_URL}/api/performances/${id}`);
        const result = await response.json();

        // [중요 수정] Swagger 응답 구조가 { success: true, data: [...] } 형식이므로 
        // 상세 페이지에서는 배열의 첫 번째 요소를 꺼내서 저장해야 합니다.
        if (result.success && result.data) {
          const data = Array.isArray(result.data) ? result.data[0] : result.data;
          setPerformanceInfo(data); // result.data 대신 정제된 data를 넣어야 함
        }
      } catch (err) {
        console.error("데이터 호출 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

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
              src={performanceInfo.poster} // Swagger: "http://www.kopis.or.kr/..."
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
                  {/* undefined 방지를 위해 기본값 0 설정 */}
                  <td>{(performanceInfo.viewCount || 0).toLocaleString()}회</td>
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
