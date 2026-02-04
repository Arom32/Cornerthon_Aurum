import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './community-free.css';
import Header from '../Header/Header.jsx';
const BACK_URL = import.meta.env.VITE_BACK_URL

const Communityfree = () => {
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const response = await fetch(`${BACK_URL}/api/boards/list?${params.toString()}`);
                const result = await response.json();

                console.log(result);
                if (result.success && Array.isArray(result.data)) {
                    const writingData = result.data.map(post => ({
                        id : post.id,
                        title: post.title,
                        creator : post.creator.username,
                        date : post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : '-'
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
                    <Link to='/writing'>글쓰기</Link>
                    <div className='search-bar'>
                        <input type='text' placeholder='검색어를 입력하세요'/>
                        <button className='serch'>검색</button>
                    </div>
                </div>
                {/* 번호,제목등등 */}
                <table className='free-section'>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>작성자</th>
                            <th>제목</th>
                            <th>등록일</th>
                        </tr>
                    </thead>
                    {/* 그 글쓰기 파트 */}
                    <tbody>
                        {posts.length > 0 ? (
                        posts.map((post, index) => (
                        <tr key={index}>
                        {/* 번호: 데이터에 없으면 index+1 로 표시 가능 */}
                            <td>{ index + 1}</td>
                            <td>{ post.creator }</td>
                            <td className='post-title'>
                                <Link to={`/community/${post.id}`}>{post.title}</Link>
                            </td>
                            {/* 등록일(데이터에 해당 필드가 있어야함) */}
                        <td>{post.date}</td>
                        </tr>
                    ))
                        ) : (
                        <tr>
                            <td colSpan="4" className="no-data">등록된 게시글이 없습니다.</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                
            </article>
            
        </div>
    );
};

export default Communityfree;