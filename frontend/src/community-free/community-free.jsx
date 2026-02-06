import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './community-free.css';
import Header from '../Header/Header.jsx';
import ModalFreeBoard from '../free-bulletin-board/modal-free-bulletin-board';

const BACK_URL = import.meta.env.VITE_BACK_URL

const Communityfree = ({userId}) => {
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

    // fetchData를 별도 함수로 분리
    const fetchData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: 1,
                limit: 20,
                category: 'general'
            });

            const response = await fetch(`http://localhost:5000/api/boards/list?${params.toString()}`);
            const result = await response.json();

            console.log(result);
            if (result.success && Array.isArray(result.data)) {
                const writingData = result.data.map(post => ({
                    id: post._id,
                    title: post.title,
                    creator: post.creator.username,
                    date: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : '-',
                    likes: post.countLikes,
                }));
                setPosts(writingData);
            }
        } catch (error) {
            console.error('데이터 연결 실패', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 모달이 닫힐 때 데이터 새로고침
    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchData();
    };

    // 검색 기능
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }
        // 검색 로직 실행
        console.log('검색어:', searchTerm);
    };

    // 검색된 게시글 필터링
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.creator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 데이터 로딩 중일 때 처리
    if (loading) return <div>로딩 중</div>;

    return (
        <div className="container">
            <Header userId={userId} />
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
                        <input 
                            type='text' 
                            placeholder='검색어를 입력하세요'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                        <button className='serch' onClick={handleSearch}>검색</button>
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
                        ) : filteredPosts.length > 0 ? (
                            filteredPosts.map((post, index) => (
                                <tr key={post.id} className={post.isNotice ? 'notice-row' : ''}>
                                    <td className="col-id">
                                        {post.isNotice ? <span className="notice-badge">공지</span> : index+1}
                                    </td>
                                    <td className='col-author'>{post.creator}</td>
                                    <td className="col-title text-left ">
                                        <Link to={`/writing/${post.id}`} className="post-link">{post.title}</Link>
                                    </td>
                                    <td className="col-likes">{post.likes}</td>
                                    <td className="col-date">{post.date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="status-msg">
                                {searchTerm ? '검색 결과가 없습니다.' : '등록된 게시글이 없습니다.'}
                            </td></tr>
                        )}
                    </tbody>
                </table>
                
            </article>
            
            {/* 모달 조건부 렌더링 */}
            {isModalOpen && (
                <ModalFreeBoard 
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                />
            )}
            
        </div>
    );
};

export default Communityfree;