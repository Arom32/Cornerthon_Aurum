import {Link} from 'react-router-dom';
import './main-option.css';

const Mainoption = () => {
    return(
        <div className='container'>
            {/* 상단 헤더 */}
            <header className='header'>
                <div className='logo'>AURUM</div>
                <div className='search-bar'>
                    <input type='text' placeholder='검색어를 입력하세요'/>
                </div>
                <nav className='section'>
                    <Link to='/login'>로그인</Link>
                    <Link to='/signup'>회원가입</Link>
                    <LInk to='/mypage'>mypage</LInk>
                </nav>
            </header>
            {/* 기능 선택 */}
            <div className='main-function'>
                <Link to='/information' className ='info-card-link'>
                    <div className='information'>
                        <div className='icon-box'>
                            {/* 아이콘 이미지 or svg 삽입 */}
                        </div>
                        <span>문화 예술 공연 정보</span>
                    </div>
                </Link>
                <Link to='/community' className ='info-card-link'>
                    <div className='community'>
                        <div className='icon-box'>
                            {/* 아이콘 이미지 or svg 삽입 */}
                        </div>
                        <span>커뮤니티</span>
                    </div>
                </Link>
            </div>
            
        </div>
    )
};
export default Mainoption;