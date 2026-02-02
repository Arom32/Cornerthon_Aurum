import React,{useState,useEffect} from 'react'; 
import {Link,useNavigate} from 'react-router-dom';
import './main-performace.css';

const Mainperformance = () =>{
    //백엔드에서 받아올 공연 데이터 (state)
    const [performance ,setPerformance]= useState([]);
        // 백엔드 api 호출
    const navigate= useNavigate(); // 카테고리에서 누르면 그 페이지로 이동
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
                    // .filter(post => post.category === '페스티벌') // -이 부분은 카테고리별로 들어가서 할 예정 
                    id: post.id,
                    imgUrl: post.url,
                    title: post.title
                }));
        
                setPerformance(performanceData);
            } catch(error){console.error("데이터 연결 실패",error);}
            };
        fetchData();
    }, []); //페이지 로드시 1회 실행
    // 추천 공연 4개만 나오도록 고정 
    const recommend = performance.slice(0,4);
    // rec-추천 영역
    // all-전체 영역
    return(
        <div className="container">
            {/* 상단 헤더 */}
            <header className="header">
                <div className="logo">AURUM</div>
                <div className="search-bar">
                    <input type="text" placeholder="검색어를 입력하세요"/>
                </div>
                <nav className="section">
                    <Link to ="/login">로그인</Link>
                    <Link to ="/signup">회원가입</Link>
                    <Link to ="/mypage">mypage</Link>
                </nav>
            </header>
            {/* 추천 공연  */}
            <section className="recommend-section">
                <h2 className="section-title">추천 공연</h2>
                <div className="section-grid">
                    {recommend.map((item)=>(
                        <div key={'rec-${item.id}'} className="image-card">
                            <img src={item.imgUrl} alt={item.title}/>
                            <p>{item.title}</p>   
                        </div>
                    ))}
                </div>
            </section>
            {/* 가운데 카테고리 영역 */}
            <nav className="middle-category">
                <Link to="/all">전체</Link>
                <LInk to="/concert">콘서트</LInk>
                <LInk to="/musical">뮤지컬</LInk>
                <LInk to="/play-acting">연극</LInk>
                <LInk to="/festival">페스티벌</LInk>
                <LInk to="/display">전시</LInk>
            </nav>
            {/* 전체 공연 모음 영역 */}
            {/* 핉터 된 부분은 map 영역안에서의 performance부분 이름을 바꿔서 사용 */}
            <section className="all-performance">
                <div className="all-grid">
                    {/* map을 사용해서 performance 를 맵으로 바꾸면 전체 가능*/}
                    {performance.map((item)=>(
                        <div key={'all-${item}'} className="image-card">
                            <img src={item.imgUrl} alt = {img .title}/>
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>        
            </section>
        </div>
    );
};
export default Mainperformance;