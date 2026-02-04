import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import './writing.css';
import Header from '../Header/Header.jsx';

const Writing = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 주소부분에 백엔드 주소 넣으면 됩니다.
                const response = await fetch(`주소/posts/${id}`);
                const result = await response.json();

                if (result.success) {
                    setPost(result.data.post);
                    setComments(result.data.comments);
                }
            } catch (error) {
                console.log("데이터 연결 실패 ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // 댓글 쓰기 
    const Commentwriting = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`주소/posts/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    content: newComment,
                    author: "user" //사용자 아이디
                })
            });
            const result = await response.json();
            
            if (result.success) {
                // 새 댓글을 맨 위에 추가
                setComments([result.data, ...comments]);
                setNewComment(""); 
            }
        } catch (error) {
            alert("댓글 등록에 실패했습니다.");
        }
    };

    if (loading) return <div>로딩 중</div>;

    return (
        <div className="container">
            <Header />
            {/* 글 화면 */}
            <div className='writing-detail'>
                {/* 글 제목,내용,좋아요 */}
                <article className='writing-section'>
                    {post ? (
                        <>
                            <h1 className="post-title">{post.title}</h1> {/* API에서 가져온 제목 */}
                            <hr className="divider" />
                            <div className="post-body">
                                {post.content} {/* API에서 가져온 본문 내용 */}
                            </div>
                        </>
                    ) : (
                        <p>게시글을 찾을 수 없습니다.</p>
                    )}
                    <div className="like-section">
                        <button className="like-btn">
                            <span className="heart-icon">♥</span> 좋아요
                        </button>
                    </div>
                </article>

                {/* 댓글 목록 - 개수 제한 없음 */}
                <section className='comment-section'>
                    <h3 className="comment-title">댓글</h3>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={comment._id || index} className="comment-item">
                                <span className="comment-author">{comment.author}</span> {/* API에서 가져온 작성자 */}
                                <span className="comment-text">{comment.content}</span> {/* API에서 가져온 댓글 내용 */}
                            </div>
                        ))
                    ) : (
                        <p className="no-comment">첫 번째 댓글을 남겨보세요!</p>
                    )}
                </section>

                {/* 댓글 입력하기 */}
                <section className='reply-section'>
                    <form onSubmit={Commentwriting} className="comment-form">
                        <input 
                            type="text" 
                            className="comment-input" 
                            placeholder="댓글 쓰기" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        {/* 엔터,등록버튼 누르면 Commentwriting 함수 실행*/}
                        <button type="submit" className="comment-submit-btn">등록</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Writing;