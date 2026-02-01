import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './main-page.css';

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
                const response = await fetch('주소');
                const data = await response.json();
                
                // api 데이터를 서비스에 맞게
                const performanceData = data.map(post => ({
                    id: post.id,
                    imgUrl: post.url,
                    title: post.title
                }));

                setPerformance(performanceData);
            } catch(error){console.error("데이터 연결 실패",error);}
        };
        fetchData();
    }, []); //페이지 로드시 1회 실행

    return(
        <div className="container">
            {/* 상단 헤더 */}
            <header className="header">
                <div className="logo">AURUM</div>
                <div className="search-bar">
                    <input type="text" placeholder="검색어를 입력하세요"/>
                </div>
                <nav className="section">
                    <Link to="/login">로그인</Link>
                    <Link to="/signup">회원가입</Link>
                    <Link to="/mypage">my page</Link>
                    
                </nav>
            </header>
            {/* 메인 컨텐츠 */}
            <main className="main-content">
                {/* 왼쪽 로고,설명,스타트 버튼 */}
                <div className="left-content">
                    <h1 className="main-title">AURUM</h1>
                    <p className="explanation">
                        "An integrated cultural arts platform for discovering information and connecting through shared experiences."
                    </p>
                    <button className="start-btn">start</button>
                </div>
                {/* 오른쪽 추천 공연 4개 */}
                <div className="right-content">
                    <div className="image-grid">
                        {performance.slice(0,4).map((item)=>(
                            <div key={item.id} className="image-card">
                                <img src={item.imgUrl} alt={item.title}/>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
};
export default Mainpage;