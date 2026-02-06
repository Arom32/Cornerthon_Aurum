import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './writing.css';
import Header from '../Header/Header.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:5000';

const CommentItem = ({ comment, handleReply, toggleCommentLike }) => {
    return (
        <div className={`comment-group ${comment.parentCommentId ? 'reply-group' : ''}`}>
            <div className="comment-item">
                <div className="comment-info">
                    <span className="comment-author">{comment.creator?.username || '익명'}</span>
                </div>
                <div className="comment-content">
                    <p className="comment-text">{comment.content}</p>
                    <div className="comment-actions">
                        <button className="reply-btn" onClick={() => handleReply(comment._id, comment.creator?.username)}>답글</button>
                        <button className="comment-like-btn" onClick={() => toggleCommentLike(comment._id)}>
                            ♡ {comment.countLikes || 0}
                        </button>
                    </div>
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && (
                <div className="replies-container">
                    {comment.replies.map(reply => (
                        <CommentItem 
                            key={reply._id} 
                            comment={reply} 
                            handleReply={handleReply} 
                            toggleCommentLike={toggleCommentLike} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Writing = ({ userId }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState(""); 
    const [replyTo, setReplyTo] = useState(null);

    const checkAuth = useCallback(() => {
        if (!userId) {
            if (window.confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?")) {
                navigate('/login');
            }
            return false;
        }
        return true;
    }, [userId, navigate]);

    const fetchData = useCallback(async () => {
        try {
            const postResponse = await fetch(`${BACK_URL}/api/boards/list?page=1&limit=100`);
            const postResult = await postResponse.json();
            if (postResult.success && Array.isArray(postResult.data)) {
                const foundPost = postResult.data.find(p => p._id === id);
                if (foundPost) setPost(foundPost);
            }

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

    // --- [수정] 좋아요 토글 기능 ---
    const toggleLike = async () => {
    if (!checkAuth()) return;

    // 1. 전송 직전 데이터 검증
    if (!id) {
        console.error("오류: 게시물 ID가 없습니다!");
        return;
    }

    console.log("서버로 보내는 ID:", id); // 콘솔에서 이 값이 '24자리 문자열'인지 확인

    try {
        const response = await fetch(`${BACK_URL}/api/boards/like`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json' // 2. 헤더 확인
            },
            credentials: 'include', // 3. 쿠키 전송 확인
            body: JSON.stringify({ id }) 
        });

        // 서버에서 에러 응답을 줄 경우 상세 내용 출력
        if (!response.ok) {
            const errorData = await response.json();
            console.error("서버 에러 응답:", errorData);
            alert(`에러: ${errorData.message}`);
            return;
        }

        const result = await response.json();
        setPost(prev => ({ ...prev, countLikes: result.likesCount }));

    } catch (error) {
        console.error("네트워크/통신 에러:", error);
    }
};
    const toggleCommentLike = async (commentId) => {
        if (!checkAuth()) return;
        try {
            const response = await fetch(`${BACK_URL}/api/comments/${commentId}/like`, {
                method: 'PATCH',
                credentials: 'include',
            });
            if (response.ok) fetchData(); 
        } catch (error) { console.error("좋아요 실패"); }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!checkAuth() || !newComment.trim()) return;

        try {
            const response = await fetch(`${BACK_URL}/api/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ 
                    boardId: id, 
                    content: newComment,
                    parentCommentId: replyTo 
                })
            });

            if (response.ok) {
                setNewComment("");
                setReplyTo(null);
                fetchData(); 
            }
        } catch (error) { alert("등록 실패"); }
    };

    const handleReply = (commentId, username) => {
        setReplyTo(commentId);
        setNewComment(`@${username} `);
    };

    const deletePost = async () => {
        if (!checkAuth() || !window.confirm("삭제하시겠습니까?")) return;
        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) navigate('/community-free');
        } catch (error) { alert("삭제 실패"); }
    };

    if (loading) return <div className="container"><Header /><div className="loading">로딩 중...</div></div>;
    if (!post) return <div className="container"><Header /><div className="error">글을 찾을 수 없습니다.</div></div>;

    return (
        <div className="container">
            <Header userId={userId} />
            <main className='writing-detail'>
                <article className='writing-section'>
                    <div className="title-area">
                        <h1 className="post-title">{post.title}</h1>
                        {userId && post.creator?._id === userId && (
                            <div className="button-group">
                                <button onClick={() => navigate(`/edit/${id}`)} className="edit-btn">수정</button>
                                <button onClick={deletePost} className="delete-btn">삭제</button>
                            </div>
                        )}
                    </div>
                    <div className="post-meta">
                        <span className="post-author">작성자: {post.creator?.username || '익명'}</span>
                    </div>
                    <div className="post-body">{post.content}</div>
                    <div className="like-section">
                        <button className="like-btn" onClick={toggleLike}>
                            좋아요 ♡ {post.countLikes ?? 0}
                        </button>
                    </div>
                </article>

                <section className='comment-section'>
                    <h3 className="comment-title">댓글</h3>
                    <div className="comment-list">
                        {comments.map((comment) => (
                            <CommentItem 
                                key={comment._id} 
                                comment={comment} 
                                handleReply={handleReply} 
                                toggleCommentLike={toggleCommentLike} 
                            />
                        ))}
                    </div>
                </section>

                <section className='reply-section'>
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <input 
                            type="text" 
                            className="comment-input" 
                            placeholder="댓글을 입력하세요" 
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)} 
                            readOnly={!userId}
                        />
                        <button type="submit" className="comment-submit-btn">등록</button>
                    </form>
                    {replyTo && (
                        <button className="cancel-reply-btn" onClick={() => { setReplyTo(null); setNewComment(""); }}>취소</button>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Writing;