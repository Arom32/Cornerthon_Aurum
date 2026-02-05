import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './performance-display.css'; // CSS 파일명 수정
import Header from '../Header/Header.jsx';
import CategoryBar from '../CategoryBar/CategoryBar.jsx';

const BACK_URL = "http://localhost:5000"; 

const Display = () => {
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACK_URL}/api/performances`);
                const result = await response.json();
                const data = result.data;
                             
                const performanceData = data
                    .filter(post => post.category === '전시') // 카테고리 필터 수정
                    .map(post => ({
                        id: post.id,
                        imgUrl: post.poster,
                        title: post.prfnm
                    }));
                setPerformance(performanceData);
                setLoading(false); // 데이터 로딩 완료 시 해제
            } catch(error) {
                console.error("데이터 연결 실패", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 보라색 스켈레톤 카드 생성
    const renderSkeletons = (count) => {
        return Array.from({ length: count }).map((_, index) => (
            <div key={`skeleton-${index}`} className="image-card">
                <div className="image-card-skeleton"></div>
            </div>
        ));
    };

    // 전시 카드 렌더링 - 최소 4개 고정
    const renderDisplayCards = () => {
        if (loading) {
            return renderSkeletons(4);
        }
        
        const minCards = 4;
        const totalCards = Math.max(performance.length, minCards);
        const cards = [];

        for (let i = 0; i < totalCards; i++) {
            if (performance[i]) {
                cards.push(
                    <article 
                        key={`display-${performance[i].id}`} 
                        className="image-card" 
                        onClick={() => navigate(`/detail/${performance[i].id}`)}
                    >
                        <img src={performance[i].imgUrl} alt={performance[i].title}/>
                        <p>{performance[i].title}</p>
                    </article>
                );
            } else {
                cards.push(
                    <div key={`skeleton-${i}`} className="image-card">
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
            <CategoryBar />
            
            {/* 공연 종류 - 전시 */}
            <section className="kind-display">전시</section>
            
            {/* 공연 설명 */}
            <nav className="ex-display">오늘의 전시 정보를 안내해 드립니다.</nav>
            
            {/* 전시 목록 섹션 */}
            <nav className="all-display">
                <div className="all-grid">
                    {renderDisplayCards()}
                </div>
            </nav>
        </div>
    );
};

export default Display;