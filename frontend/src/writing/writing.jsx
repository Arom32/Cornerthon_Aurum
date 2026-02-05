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
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState(null); // 답글 대상 댓글 ID
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

    // 댓글 좋아요
    const toggleCommentLike = async (commentId) => {
        try {
            const response = await fetch(`${BACK_URL}/api/comments/${commentId}/like`, {
                method: 'PATCH',
                credentials: 'include',
            });
            const result = await response.json();
            if (result.success) {
                setComments(prev => prev.map(comment => 
                    comment._id === commentId 
                        ? { ...comment, countLikes: result.data.countLikes }
                        : comment
                ));
            }
        } catch (error) { console.error("좋아요 실패"); }
    };

    // 댓글 작성
    const Commentwriting = async (e) => {
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
                    content: newComment,
                    parentId: replyTo // 답글인 경우 부모 댓글 ID 전송
                })
            });

            if (response.status === 201) {
                setNewComment("");
                setReplyTo(null); // 답글 모드 해제
            }
        } catch (error) {
            alert("댓글 등록에 실패했습니다.");
        }
    };

    // 답글 버튼 클릭
    const handleReply = (commentId, username) => {
        setReplyTo(commentId);
        setNewComment(`@${username} `); // 답글 대상 표시
    };

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
                    {/* 제목과 버튼 영역 */}
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

                    {/* 작성자 및 카테고리 정보 */}
                    <div className="post-meta">
                        <span className="post-author">
                            작성자: {post.creator?.username || '익명'}
                        </span>
                        <span className="post-category">
                            {post.category || '일반'}
                        </span>
                    </div>

                    {/* 본문 내용 */}
                    <div className="post-body">
                        {post.content}
                    </div>

                    {/* 좋아요 버튼 */}
                    <div className="like-section">
                        <button className="like-btn" onClick={toggleLike}>
                            좋아요 ♡ {post.countLikes || 0}
                        </button>
                    </div>
                </article>

                {/* 댓글 섹션 */}
                <section className='comment-section'>
                    <h3 className="comment-title">댓글 ({comments.length})</h3>
                    <div className="comment-list">
                        {comments.map((comment) => (
                            <div 
                                key={comment._id} 
                                className={`comment-item ${comment.parentId ? 'reply' : ''}`}
                            >
                                <span className="comment-author">
                                    {comment.creator?.username || '익명'}
                                </span>
                                <div className="comment-content">
                                    <p className="comment-text">{comment.content}</p>
                                    {/* 댓글 액션 버튼 */}
                                    <div className="comment-actions">
                                        <button 
                                            className="reply-btn"
                                            onClick={() => handleReply(comment._id, comment.creator?.username || '익명')}
                                        >
                                            답글
                                        </button>
                                        <button 
                                            className="comment-like-btn"
                                            onClick={() => toggleCommentLike(comment._id)}
                                        >
                                            ♡ {comment.countLikes || 0}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 댓글 입력창 */}
                <section className='reply-section'>
                    <form onSubmit={(e) => handleCommentSubmit(e)} className="comment-form">
                        <input 
                            type="text" 
                            className="comment-input" 
                            placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요"} 
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)} 
                            readOnly={!userId}
                            onClick={() => !userId && checkAuth()}
                        />
                        <button type="submit" className="comment-submit-btn">
                            {replyTo ? '답글 등록' : '등록'}
                        </button>
                    </form>
                    {replyTo && (
                        <button 
                            className="cancel-reply-btn"
                            onClick={() => {
                                setReplyTo(null);
                                setNewComment("");
                            }}
                        >
                            답글 취소
                        </button>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Writing;