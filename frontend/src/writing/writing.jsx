import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './writing.css';
import Header from '../Header/Header.jsx';

const BACK_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:5000';

const Writing = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState(null); // 답글 대상 댓글 ID
    const [loading, setLoading] = useState(true);

    // 데이터 패칭 로직
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await fetch(`${BACK_URL}/api/boards/list?page=1&limit=100`);
                const postResult = await postResponse.json();
                if (postResult.success && Array.isArray(postResult.data)) {
                    const foundPost = postResult.data.find(p => p._id === id);
                    if (foundPost) setPost(foundPost);
                }
                const commentsResponse = await fetch(`${BACK_URL}/api/boards/${id}/comments`);
                const commentsResult = await commentsResponse.json();
                if (commentsResult.success) setComments(commentsResult.data || []);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // 좋아요 기능
    const toggleLike = async () => {
        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}/like`, {
                method: 'PATCH',
                credentials: 'include',
            });
            const result = await response.json();
            if (result.success) setPost(prev => ({ ...prev, countLikes: result.data.countLikes }));
        } catch (error) { console.error("좋아요 실패"); }
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
        if (!newComment.trim()) return;
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
            const result = await response.json();
            if (result.success) {
                setComments(prev => [result.data, ...prev]);
                setNewComment("");
                setReplyTo(null); // 답글 모드 해제
            }
        } catch (error) { alert("댓글 등록 실패"); }
    };

    // 답글 버튼 클릭
    const handleReply = (commentId, username) => {
        setReplyTo(commentId);
        setNewComment(`@${username} `); // 답글 대상 표시
    };

    const deletePost = async () => {
        if (!window.confirm("삭제하시겠습니까?")) return;
        try {
            const response = await fetch(`${BACK_URL}/api/boards/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const result = await response.json();
            if (result.success) navigate('/free');
        } catch (error) { alert("삭제 실패"); }
    };

    if (loading) return <div className="container"><Header /><div className="loading">로딩 중...</div></div>;
    if (!post) return <div className="container"><Header /><div className="error">글을 찾을 수 없습니다.</div></div>;

    return (
        <div className="container">
            <Header />
            <main className='writing-detail'>
                <article className='writing-section'>
                    {/* 제목과 버튼 영역 */}
                    <div className="title-area">
                        <h1 className="post-title">{post.title}</h1>
                        <div className="button-group">
                            <button onClick={() => {/* 수정 로직 */}} className="edit-btn">수정</button>
                            <button onClick={deletePost} className="delete-btn">삭제</button>
                        </div>
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
                    <form onSubmit={Commentwriting} className="comment-form">
                        <input 
                            type="text" 
                            className="comment-input" 
                            placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요"} 
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)} 
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