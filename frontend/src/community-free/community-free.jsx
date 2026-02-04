import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './community-free.css';
import Header from '../Header/Header.jsx';

/*모달 컴포넌트 임포트*/
// 7번 라인 부근 수정
import ModalFreeBoard from '../free-bulletin-board/modal-free-bulletin-board';

const BACK_URL = import.meta.env.VITE_BACK_URL

const Communityfree = () => {
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                setLoading(true);
                const params = new URLSearchParams({
                    page: 1,
                    limit: 20,
                    category: 'general' // 자유게시판이므로 general 필터링
                });

                //주소 부분에 실제 백엔드 주소 넣으면 됩니다.
                const response = await fetch(`http://localhost:5000/api/boards/list?${params.toString()}`);
                const result = await response.json();

                
                console.log(result);
                if (result.success && Array.isArray(result.data)) {
                    const writingData = result.data.map(post => ({
                    id : post._id,
                    title: post.title,
                    creator : post.creator.username,
                    date : post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : '-',
                    likes: post.countLikes,
                    }
                ));
                    // 위에서 선언한 setPosts를 사용합니다.
                    setPosts(writingData);
            }
            } catch (error) {
                console.error('데이터 연결 실패', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // 빈 배열은 컴포넌트가 처음 나타날 때 한 번만 실행됨을 의미합니다.

    // 데이터 로딩 중일 때 처리
    if (loading) return <div>로딩 중</div>;

    return (
        <div className="container">
           <Header/>
            {/* 자유게시판 */}
            <article className='free-community'>
                <div className='free-title'>자유게시판</div>
                <p>다양한 소통을 자유롭게 나눠보세요.</p>
                <div className='action-bar'>
                    <button 
                        className="write-btn" 
                        onClick={() => setIsModalOpen(true)}
                        style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#6e45e2', color: '#fff', border: 'none', borderRadius: '5px' }}
                    >
                        글쓰기
                    </button>
                    <div className='search-bar'>
                        <input type='text' placeholder='검색어를 입력하세요'/>
                        <button className='serch'>검색</button>
                    </div>
                </div>
                {/* 번호,제목등등 */}
                <table className='free-section'>
                    <thead>
                        <tr>
                        <th className="col-id">번호</th>
                        <th className="col-author">작성자</th>
                        <th className="col-title">제목</th>
                        <th className="col-likes">좋아요</th>
                        <th className="col-date">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                        <tr><td colSpan="5" className="status-msg">로딩 중...</td></tr>
                        ) : posts.length > 0 ? (
                        posts.map((post, index) => (
                            <tr key={post.id} className={post.isNotice ? 'notice-row' : ''}>
                            <td className="col-id">
                                {post.isNotice ? <span className="notice-badge">공지</span> : index+1}
                            </td>
                            <td className='col-author'>{post.creator}</td>
                            <td className="col-title text-left ">
                                <a href={`/board/${post.id}`} className="post-link">{post.title}</a>
                            </td>
                            <td className="col-likes">{post.likes}</td>
                            <td className="col-date">{post.date}</td>
                            </tr>
                        ))
                        ) : (
                        <tr><td colSpan="5" className="status-msg">등록된 게시글이 없습니다.</td></tr>
                        )}
                    </tbody>
                </table>
                
            </article>
            
            {/* 4. 모달 조건부 렌더링 */}
           {/* Communityfree.jsx 하단 */}
            {isModalOpen && (
            <ModalFreeBoard 
            isOpen={isModalOpen} // 이 속성이 전달되어야 모달이 보입니다.
            onClose={() => setIsModalOpen(false)} 
    />
)}
            
        </div>
    );
};

export default Communityfree;