// main-performance.jsx
import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

import './main-performance.css';


import Header from '../Header/Header.jsx';
const BACK_URL = import.meta.env.VITE_BACK_URL;

const Mainperformance = () => {
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACK_URL}/api/performances`); 
                const data = await response.json();
                
                const performanceData = data.map(post => ({

                    id: post.id,
                    imgUrl: post.url,
                    title: post.title
                }));
        
                setPerformance(performanceData);
                setLoading(false); // 로딩 완료
            } catch (error) {
                console.error("데이터 연결 실패", error);
                setLoading(false); // 에러 발생해도 로딩 종료
            }
        };
        fetchData();
    }, []);

    const recommend = performance.slice(0, 4);

    // 스켈레톤 카드 렌더링 함수
    const renderSkeletons = (count) => {
        return Array.from({ length: count }).map((_, index) => (
            <div key={`skeleton-${index}`} className="image-card">
                <div className="image-card-skeleton"></div>
            </div>
        ));
    };

    return (
        <div className="container">
            <Header />
            
            {/* 추천 공연 섹션 */}
            <section className="recommend-section">
                <h2 className="section-title">추천 공연</h2>
                <div className="section-grid">
                    {loading 
                        ? renderSkeletons(4) 
                        : recommend.map((item) => (
                            <div 
                                key={`rec-${item.id}`} 
                                className="image-card"
                                onClick={() => navigate(`/detail/${item.id}`)}
                            >
                                <img src={item.imgUrl} alt={item.title} />
                                <p>{item.title}</p>   
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* 카테고리 네비게이션 */}
            <nav className="middle-category">
                
                <Link to="/concert">콘서트</Link>
                <Link to="/musical">뮤지컬</Link>
                <Link to="/playacting">연극</Link>
                <Link to="/festival">페스티벌</Link>
                <Link to="/display">전시</Link>
            </nav>

            {/* 전체 공연 섹션 */}
            <section className="all-performance">
                <div className="all-grid">
                    {loading 
                        ? renderSkeletons(8) 
                        : performance.map((item) => (
                            <div 
                                key={`all-${item.id}`} 
                                className="image-card"
                                onClick={() => navigate(`/detail/${item.id}`)}
                            >
                                <img src={item.imgUrl} alt={item.title} />
                                <p>{item.title}</p>
                            </div>
                        ))
                    }
                </div>        
            </section>
        </div>
    );
};

export default Mainperformance;