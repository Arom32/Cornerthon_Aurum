import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import './performance-playacting.css';
import Header from '../Header/Header.jsx';
import CategoryBar from '../CategoryBar/CategoryBar.jsx';

const Playacting = () => {
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
                const performanceData = data
                    .filter(post => post.category === '연극') // -이 부분은 카테고리별로 들어가서 할 예정 
                    .map(post => ({
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
        <div clasName = "container">
            <Header/>
            <CategoryBar/>
            {/* 공연 종류-연극 */}
            <section className="kind-musical">연극</section>
            {/* 공연 종류 밑에 있는 설명-연극 */}
            <nav className="ex-musical">오늘의 연극 정보를 안내해드립니다.</nav>
            {/* 공연 종류별로 공연 정보 - 연극*/}
            <nav className="all-musical">
                <div className="all-grid">
                    {/* map을 사용해서 performance 를 맵으로 바꾸면 전체 가능*/}
                    {performance
                        .filter(item=>item.category==='연극')
                        .map((item)=>(
                            <article key={'all-${item.id}'} className="image-card" onClick={()=>NavigationHistoryEntry('/detail/${item.id}')}>
                                {/* onClick-상세 페이지 이동 */}
                                <img src={item.imgUrl} alt = {img .title}/>
                                <p>{item.title}</p>
                            </article>
                        ))
                    }
                </div>
            </nav>
        </div>
   )
};
export default Playacting;

