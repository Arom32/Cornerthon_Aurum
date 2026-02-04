import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './main-page.css';
import Header from '../Header/Header.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL || "http://localhost:5000";

// 1. props로 userId를 받아오도록 수정
const MainPage = ({ userId }) => { 
    const [performance, setPerformance] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(BACK_URL + '/api/performances/ranking');
                const result = await response.json();
                
                if (result.success && Array.isArray(result.data)) {
                    const performanceData = result.data.map(post => ({
                        id: post._id,
                        imgUrl: post.poster,
                        title: post.prfnm
                    }));
                    setPerformance(performanceData); 
                }
            } catch (error) {
                console.error("데이터 연결 실패", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <Header userId={userId} />
            <main className="main-content">
                <div className="left-content">
                    {/* 2. 로그인한 사용자의 아이디를 화면에 표시 (선택 사항) */}
                    <h1 className="main-title">AURUM</h1>
                    {userId && <p style={{color: '#5235A8', fontWeight: 'bold'}}>{userId}님 환영합니다!</p>}
                    
                    <p className="explanation">
                        "An integrated cultural arts platform for discovering information and connecting through shared experiences."
                    </p>
                    <Link to="/main-option" className="start-button">start</Link>
                </div>

                <div className="right-content">
                    <div className="image-grid">
                        {performance.length > 0 ? (
                            performance.slice(0, 4).map((item) => (
                                <div key={item.id} className="image-card">
                                    <img src={item.imgUrl} alt={item.title} />
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="image-card skeleton"></div>
                                <div className="image-card skeleton"></div>
                                <div className="image-card skeleton"></div>
                                <div className="image-card skeleton"></div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainPage;