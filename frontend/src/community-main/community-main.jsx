import React from 'react';
import {Link} from 'react-router-dom';
import './community-main.css';
import Header from '../Header/Header.jsx';
const communitymain = () => {
    return(
        <div className="container">
            <Header/>
            {/* 메인 영역 */}
            <nav className='community-section'>
                <h1 className="community-title">커뮤니티</h1>
                <p>다양한 커뮤니티 안에서 많은 소통을 나눠보세요.</p>
                 {/* 다른 게시판으로 넘어 가는 것 */}
                <div className='group-botton'>
                    <Link to ='/botton-free'>자유게시판</Link>
                    <Link to ='/botton-deal'> 거래게시판</Link>
                </div>
            </nav>
               
        </div>

    )
};
export default communitymain;

