import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './performance-musical.css'; // CSS 파일명 수정
import Header from '../Header/Header.jsx';
import CategoryBar from '../CategoryBar/CategoryBar.jsx';

const BACK_URL = "http://localhost:5000"; 

const Musical = () => {
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // .env에 설정한 백엔드 주소로 요청
                const response = await fetch(`${BACK_URL}/api/performances`);
                const result = await response.json();
                const data = result.data;
                            
                const performanceData = data
                    .filter(post => post.category === '뮤지컬') // 카테고리 필터 수정
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

    // 뮤지컬 카드 렌더링 - 최소 4개 고정
    const renderMusicalCards = () => {
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
                        key={`musical-${performance[i].id}`} 
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
            
            {/* 공연 종류 - 뮤지컬 */}
            <section className="kind-musical">뮤지컬</section>
            
            {/* 공연 설명 */}
            <nav className="ex-musical">오늘의 뮤지컬 정보를 안내해 드리립니다.</nav>
            
            {/* 뮤지컬 목록 섹션 */}
            <nav className="all-musical">
                <div className="all-grid">
                    {renderMusicalCards()}
                </div>
            </nav>
        </div>
    );
};
export default Musical;