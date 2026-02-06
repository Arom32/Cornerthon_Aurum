import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import './performance-list.css';

const BACK_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:5000';

const GENRE_MAP = {
    '전체': '',
    '콘서트': '대중음악',
    '뮤지컬': '뮤지컬',
    '연극': '연극',
    '클래식/국악': '서양음악(클래식),한국음악(국악)',
    '무용' : '대중무용,무용(서양/한국무용)',
    '기타' : '서커스/마술,복합',
};

const PerformanceList = ({ userId }) => {
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState('views');
    const [selectedGenre, setSelectedGenre] = useState('전체');

    const navigate = useNavigate();
    const abortControllerRef = useRef(null); // 중복 API 요청 취소용

    // 페이지/장르 변경 시 즉시 최상단 스크롤
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage, selectedGenre]);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            // 이전 요청이 있다면 취소 (Race Condition 방지)
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            setLoading(true);
            
            try {
                const params = new URLSearchParams({
                    page: String(currentPage),
                    limit: '20',
                    sort: sort
                });

                const genreQuery = GENRE_MAP[selectedGenre];
                if (genreQuery) {
                    params.append('genre', genreQuery);
                }

                const response = await fetch(`${BACK_URL}/api/performances?${params.toString()}`, {
                    signal: abortControllerRef.current.signal
                });
                const result = await response.json();

                if (result.success) {
                    setPerformance(result.data);
                    setTotalPages(result.pagination.totalPage || 1);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("데이터 로드 실패:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPerformanceData();

        return () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, [currentPage, sort, selectedGenre]);

    const renderCards = () => {
        if (loading) {
            return Array.from({ length: 8 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="image-card">
                    <div className="image-card-skeleton"></div>
                    <div className="skeleton-text skeleton-title"></div>
                </div>
            ));
        }

        if (performance.length === 0) {
            return <p className="no-data">해당 조건의 공연이 없습니다.</p>;
        }

        return performance.map((item) => (
            <div 
                key={item._id} 
                className="image-card" 
                onClick={() => navigate(`/detail/${item._id}`)}
            >
                <img src={item.poster} alt={item.prfnm} />
                <p className="card-title">{item.prfnm}</p>
            </div>
        ));
    };

    return (
        <div className="container">
            <Header userId={userId} />
            
            <nav className="middle-category">
                {['전체', '콘서트', '뮤지컬', '연극', '클래식/국악', '무용', '기타'].map(genre => (
                    <button 
                        key={genre}
                        className={selectedGenre === genre ? 'active' : ''}
                        onClick={() => { setSelectedGenre(genre); setCurrentPage(1); }}
                    >
                        {genre}
                    </button>
                ))}
            </nav>

            <section className="all-performance">
                <div className="list-controls">
                    <h2 className="section-title">{selectedGenre} 리스트</h2>
                    <select value={sort} onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}>
                        <option value="views">조회수순</option>
                        <option value="likes">좋아요순</option>
                        <option value="rating">평점순</option>
                        <option value="end">종료임박순</option>
                    </select>
                </div>

                <div className="all-grid">
                    {renderCards()}
                </div>

                <div className="pagination">
                    <button 
                        disabled={currentPage <= 1 || loading} 
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        이전
                    </button>
                    <span className="page-info"><strong>{currentPage}</strong> / {totalPages}</span>
                    <button 
                        disabled={currentPage >= totalPages || loading} 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        다음
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PerformanceList;