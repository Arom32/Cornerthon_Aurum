import React from 'react';
import {Link} from 'react-router-dom';
import './main-option.css';
import Header from '../Header/Header.jsx';
// 사진
import Group33 from '../assets/Group 33.svg';
import Group51 from '../assets/Group 51.svg';
const Mainoption = () => {
    return(
        <div className='container'>
             <Header />
            {/* 기능 선택 */}
            <div className='main-function'>
                <Link to='/performance' className ='info-card-link'>
                    <div className='information'>
                        <div className='icon-box'>
                            <img src={Group51} alt="문화예술 아이콘" />
                        </div>
                        <span>문화 예술 공연 정보</span>
                    </div>
                </Link>
                <Link to='/community-main' className ='info-card-link'>
                    <div className='community'>
                        <div className='icon-box'>
                           <img src={Group33} alt="커뮤니티 아이콘" />
                        </div>
                        <span>커뮤니티</span>
                    </div>
                </Link>
            </div>
            
        </div>
    )
};
export default Mainoption;