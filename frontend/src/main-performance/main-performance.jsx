import React, { useState, useEffect } from 'react'; 

import { Link, useNavigate } from 'react-router-dom';

import './main-performance.css';

import Header from '../Header/Header.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL

const Mainperformance = () => {
    const [recommendPerformance, setRecommendPerformance] = useState([]); // 추천 공연용
    const [performance, setPerformance] = useState([]); // 전체 공연용
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                //  여기에 공연 랭킹 탑텐 API 주소 입력
                const rankingResponse = await fetch(`${BACK_URL}/api/performances/ranking`); // 추천 공연
                const rankingResult = await rankingResponse.json();
                const rankingData = rankingResult.data;
                
                const recommendData = rankingData.map(post => ({
                    id: post._id,
                    imgUrl: post.poster,
                    title: post.prfnm
                }));
                
                // 여기에 공연 상세 조회 API 주소 입력
                const allResponse = await fetch(`${BACK_URL}/api/performances`); // 전체 공연
                const allResult = await allResponse.json();
                const allData = allResult.data;
                
                const allPerformanceData = allData.map(post => ({
                    id: post._id,
                    imgUrl: post.poster,
                    title: post.prfnm
                }));
        
                setRecommendPerformance(recommendData);
                setPerformance(allPerformanceData);
                setLoading(false); 
            } catch (error) {
                console.error("데이터 연결 실패", error);
                setLoading(false); 
            }
        };
        fetchData();
    }, []);


    // 보라색 스켈레톤 카드 생성 함수
    const renderSkeletons = (count) => {
        return Array.from({ length: count }).map((_, index) => (
            <div key={`skeleton-${index}`} className="image-card">
                <div className="image-card-skeleton"></div>
            </div>
        ));
    };

    // 추천 공연 렌더링 함수 - 항상 4개 고정
    const renderRecommendCards = () => {
        if (loading) {
            return renderSkeletons(4);
        }
        
        const cards = [];
        for (let i = 0; i < 4; i++) {
            if (recommendPerformance[i]) {
                cards.push(
                    <div 
                        key={`rec-${recommendPerformance[i].id}`} 
                        className="image-card"
                        onClick={() => navigate(`/performance/${recommendPerformance[i].id}`)}
                    >
                        <img src={recommendPerformance[i].imgUrl} alt={recommendPerformance[i].title} />
                        <p>{recommendPerformance[i].title}</p>   
                    </div>
                );
            } else {
                cards.push(
                    <div key={`rec-skeleton-${i}`} className="image-card">
                        <div className="image-card-skeleton"></div>
                    </div>
                );
            }
        }
        return cards;
    };

    // 전체 공연 렌더링 함수 - 최소 4개 표시
    const renderAllCards = () => {
        if (loading) {
            return renderSkeletons(8);
        }
        
        const minCards = 4;
        const totalCards = Math.max(performance.length, minCards);
        const cards = [];

        for (let i = 0; i < totalCards; i++) {
            if (performance[i]) {
                cards.push(
                    <div 
                        key={`all-${performance[i].id}`} 
                        className="image-card"
                        onClick={() => navigate(`/performance/${performance[i].id}`)}
                    >
                        <img src={performance[i].imgUrl} alt={performance[i].title} />
                        <p>{performance[i].title}</p>
                    </div>
                );
            } else {
                cards.push(
                    <div key={`all-skeleton-${i}`} className="image-card">
                        <div className="image-card-skeleton"></div>
                    </div>
                );
            }
        }
        return cards;
    };

    return (
        <div className="container">
            <Header />
            

            <section className="recommend-section">
                <h2 className="section-title">추천 공연</h2>
                <div className="section-grid">
                    {renderRecommendCards()}
                </div>
            </section>


            <nav className="middle-category">

                <Link to="/concert">콘서트</Link>
                <Link to="/musical">뮤지컬</Link>
                <Link to="/playacting">연극</Link>
                <Link to="/festival">페스티벌</Link>
                <Link to="/display">전시</Link>
            </nav>

            <section className="all-performance">
                <div className="all-grid">
                    {renderAllCards()}
                </div>        
            </section>
        </div>
    );
};

export default Mainperformance;
