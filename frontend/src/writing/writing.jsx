import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './writing.css';
import Header from '../Header/Header.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:5000';

const Writing = ({ userId }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // 데이터 상태
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 입력 상태
    const [newComment, setNewComment] = useState(""); 
    const [replyContent, setReplyContent] = useState(""); 
    const [replyingTo, setReplyingTo] = useState(null); 

    // [함수] 로그인 체크 및 유도
    const checkAuth = useCallback(() => {
        if (!userId) {
            if (window.confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?")) {
                navigate('/login');
            }
            return false;
        }
        return true;
    }, [userId, navigate]);

    // [함수] 데이터 로드 (게시글 & 댓글)
    const fetchData = useCallback(async () => {
        try {
            // 게시글 상세 조회 (기존 list API 활용 방식 유지)
            const postResponse = await fetch(`${BACK_URL}/api/boards/list?page=1&limit=100`);
            const postResult = await postResponse.json();
            if (postResult.success && Array.isArray(postResult.data)) {
                const foundPost = postResult.data.find(p => p._id === id);
                if (foundPost) setPost(foundPost);
            }

            // 댓글 트리 조회 (백엔드 getBoardComments 연동)
            const commentsResponse = await fetch(`${BACK_URL}/api/boards/${id}/comments`);
            const commentsResult = await commentsResponse.json();
            if (commentsResult.comments) {
                setComments(commentsResult.comments);
            }
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // [기능] 좋아요 토글
    const toggleLike = async () => {
        if (!checkAuth()) return;

        try {
            const response = await fetch(`${BACK_URL}/api/boards/like`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ id })
            });

            const result = await response.json();
            if (response.status === 401) {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                navigate('/login');
                return;
            }

            if (response.ok) {
                setPost(prev => ({ ...prev, countLikes: result.likesCount }));
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("좋아요 처리 중 오류가 발생했습니다.");
        }
    };

    // [기능] 댓글/대댓글 작성
    const handleCommentSubmit = async (e, parentId = null) => {
        e.preventDefault();
        if (!checkAuth()) return;

        const content = parentId ? replyContent : newComment;
        if (!content.trim()) return;

        try {
            const response = await fetch(`${BACK_URL}/api/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    boardId: id,
                    content: content,
                    parentCommentId: parentId
                })
            });

            if (response.status === 201) {
                setNewComment("");
                setReplyContent("");
                setReplyingTo(null);
                fetchData(); 
            } else if (response.status === 401) {
                alert("로그인이 필요합니다.");
                navigate('/login');
            } else {
                const result = await response.json();
                alert(result.message);
            }
        } catch (error) {
            alert("댓글 등록에 실패했습니다.");
        }
    };

    // [기능] 게시글 삭제
    const deletePost = async () => {
        if (!checkAuth()) return;
        if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                alert("삭제되었습니다.");
                navigate('/community-free');
            } else {
                const result = await response.json();
                alert(result.message);
            }
        } catch (error) {
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <div className="container"><Header /><div className="loading">로딩 중...</div></div>;
    if (!post) return <div className="container"><Header /><div className="error">글을 찾을 수 없습니다.</div></div>;

    return (
        <div className="container">
            <Header />
            <main className='writing-detail'>
                {/* 게시글 섹션 */}
                <article className='writing-section'>
                    <div className="title-area">
                        <h1 className="post-title">{post.title}</h1>
                        {/* 작성자 본인에게만 버튼 노출 */}
                        {userId && post.creator?._id === userId && (
                            <div className="button-group">
                                <button onClick={() => navigate(`/edit/${id}`)} className="edit-btn">수정</button>
                                <button onClick={deletePost} className="delete-btn">삭제</button>
                            </div>
                        )}
                    </div>

                    <div className="post-meta">
                        <span className="meta-author">작성자: {post.creator?.username}</span>
                        <span className="meta-category">카테고리: {post.category}</span>
                        <span className="meta-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="post-body">{post.content}</div>

                    <div className="like-section">
                        <button className="like-btn" onClick={toggleLike}>
                            좋아요 ♡ {post.countLikes || 0}
                        </button>
                    </div>
                </article>

                {/* 댓글 섹션 */}
                <section className='comment-section'>
                    <h3 className="comment-title">댓글 ({comments.length})</h3>
                    
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment-group">
                            <div className="comment-item">
                                <span className="comment-author">{comment.creator?.username}</span>
                                <p className="comment-text">{comment.content}</p>
                                <button 
                                    className="reply-btn"
                                    onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                                >
                                    답글
                                </button>
                            </div>

                            {/* 대댓글 렌더링 */}
                            {comment.replies && comment.replies.map((reply) => (
                                <div key={reply._id} className="reply-item">
                                    <span className="reply-icon">ㄴ</span>
                                    <div className="reply-content">
                                        <span className="comment-author">{reply.creator?.username}</span>
                                        <p className="comment-text">{reply.content}</p>
                                    </div>
                                </div>
                            ))}

                            {/* 대댓글 입력창 (로그인 시에만 열림) */}
                            {replyingTo === comment._id && (
                                <form className="reply-form" onSubmit={(e) => handleCommentSubmit(e, comment._id)}>
                                    <input 
                                        type="text" 
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder={userId ? "답글을 입력하세요" : "로그인 후 이용 가능합니다"}
                                        readOnly={!userId}
                                        onClick={() => !userId && checkAuth()}
                                    />
                                    <button type="submit" disabled={!userId}>등록</button>
                                </form>
                            )}
                        </div>
                    ))}
                </section>

                {/* 일반 댓글 입력창 */}
                <section className='reply-section'>
                    <form onSubmit={(e) => handleCommentSubmit(e)} className="comment-form">
                        <input 
                            type="text" 
                            className="comment-input" 
                            placeholder={userId ? "댓글을 입력하세요" : "로그인이 필요한 서비스입니다"} 
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)} 
                            readOnly={!userId}
                            onClick={() => !userId && checkAuth()}
                        />
                        <button type="submit" className="comment-submit-btn" disabled={!userId}>등록</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Writing;