import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './main-page.css';
import Header from '../Header/Header.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL

const Mainpage = () => {
    //백엔드에서 받아올 공연 데이터 (state)
    const [performance ,setPerformance]= useState([]);

    // 백엔드 api 호출
    useEffect(() => {
        // 백엔드 주소 fetch('http~')
        //async-백엔드에서 데이터 가져오는 일(비동기 작업)
        // try: 이 안의 코드를 일단 실행,보호막 쳐두기 
        const fetchData = async() => {
            try{
                //주소 부분 실제로 백엔드 주소 넣으면 됩니다
                const response = await fetch(BACK_URL + '/api/performances/ranking');
                const result = await response.json();
                
                console.log(result);
                
                // result.data가 배열인지 확인 후 map 실행
                if (result.success && Array.isArray(result.data)) {
                    const performanceData = result.data.map(post => ({
                        id: post._id,      // post.id -> post._id (API 응답 기준)
                        imgUrl: post.poster, // post.url -> post.poster (API 응답 기준)
                        title: post.prfnm    // post.title -> post.prfnm (API 응답 기준)
                    }));
                    setPerformance(performanceData); }

            } catch(error){console.error("데이터 연결 실패",error);}
        };
        fetchData();
    }, []); //페이지 로드시 1회 실행

    return(
        <div className="container">
           <Header />
            {/* 메인 컨텐츠 */}
            <main className="main-content">
                {/* 왼쪽 로고,설명,스타트 버튼 */}
                <div className="left-content">
                    <h1 className="main-title">AURUM</h1>
                    <p className="explanation">
                        "An integrated cultural arts platform for discovering information and connecting through shared experiences."
                    </p>
                    <Link to ="/option">start</Link>
                </div>
                {/* 오른쪽 추천 공연 4개 */}
                <div className="right-content">
                    <div className="image-grid">
                        {performance.length > 0 ? (performance.slice(0, 4).map((item) => (
                            <div key={item.id} className="image-card">
                                <img src={item.imgUrl} alt={item.title} />
                            </div>
                        ))
                ) : (
                    // 데이터 없음->보라색 4개 카드 보임
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
    )
};
export default Mainpage;